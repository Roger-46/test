{% assign logoWidth = configuration.logoWidth | default: 150 %}
{% assign logoSize = template.logo_size | default: 100 %}
{% assign logoHeight = configuration.logoHeight | default: 75 %}
{% unless template.font_family == blank %}
<span>
  <link type="text/css" href="https://fonts.googleapis.com/css?family={{ template.font_family }}:100,100i,300,300i,400,400i,500,500i,700,700i&display=swap&subset=cyrillic,cyrillic-ext,greek,greek-ext,latin-ext,vietnamese" rel="stylesheet">
  <style type="text/css">
    #wrapper * {
      font-family: '{{ template.font_family | replace: "+", " " }}', serif;
    }
  </style>
</span>
{% endunless %}
<div id="wrapper">
  <div class="header">
    <div class="header-left">
      <div class="logo-left">
        {% unless configuration.logo == blank %}
          <a class="logo" href="{{ shop.url }}">
            <img
              style="max-width: {{ logoWidth }}px; width: {{ logoSize }}%;"
              src="{{ configuration.logo | asset_url }}"
              alt="Main Website Store" border="0"
            />
          </a>
        {% endunless %}
      </div>
      <div class="business-information">
        <p class="business-name"></p>
        <p>{{ text.address }}: {{ configuration.address }}</p>
        <p>{{ text.phone }}: {{ configuration.phone }}</p>
        <p>{{ text.tax_id }}: {{ configuration.vat_number }} </p>
        <p>{{ text.contact }}: {{ configuration.email }}</p>
        <p>{{ text.registered }}: {{ configuration.registered_number }}</p>
      </div>
    </div>
    <div class="header-right">
      <div class="info">
        <h1 class="info-title">{{ text.order | upcase }}</h1>
        <p>{{ text.order }} <b>{{ order.name }}</b></p>
        <p>{{ text.order_date }}: <b>{{ order.created_at | date }}</b></p>
        <p>{{ text.order_amount }}: <b><span class="price">{{ order.total_price | money: order.currency }}</span></b></p>
        {% if configuration.barcode_enable %}
          <p class="mp-invoice-barcode">
            {{ order.name | barcode }}
          </p>
        {% endif %}
      </div>
    </div>
  </div>
  <div class="clr"></div>
  <div class="content">
    <div class="address">
      <div class="billing-address">
        <h3 class="mp-block-heading">{{ text.payment_address }}</h3>
        <p>{{ order.billing_address.name | default: text.no_payment_address }}<br/>
          {{ order.billing_address.address1 }}<br/>
          {% unless order.billing_address.address2 == blank %}
            {{ order.billing_address.address2 }}<br/>
          {% endunless %}
          {{ order.billing_address.city }}<br/>
          {{ order.billing_address.country }}<br/>
          {% if order.billing_address.phone %}
          T: <a href="tel:{{ order.billing_address.phone }}">{{ order.billing_address.phone }}</a>
          {% endif %}
        </p>
      </div>
      <div class="shipping-address">
        <h3 class="mp-block-heading">{{ text.shipping_address }}</h3>
        <p>{{ order.shipping_address.name | default: text.no_shipping_address }}<br/>
          {{ order.shipping_address.address1 }}<br/>
          {% unless order.shipping_address.address2 == blank %}
            {{ order.shipping_address.address2 }}<br/>
          {% endunless %}
          {{ order.shipping_address.city }}<br/>
          {{ order.shipping_address.country }}<br/>
          {% if order.shipping_address.phone %}
          T: <a href="tel:{{ order.shipping_address.phone }}">{{ order.shipping_address.phone }}</a>
          {% endif %}
        </p>
      </div>
    </div>
    <div class="clr"></div>
    <div class="payment-method">
      <h3 class="mp-block-heading">{{ text.payment_method }}</h3>
      {% if order.payment_gateway_names.size > 0 %}
        <p>{{ order.payment_gateway_names.0 }}</p>
      {% else %}
        <p>{{ text.no_billing }}</p>
      {% endif %}
    </div>
    <div class="address">
      <div class="shipping-method">
        <h3 class="mp-block-heading">{{ text.shipping_method }}</h3>
        {% if order.shipping_lines.size > 0 %}
        {% for line in  order.shipping_lines %}
          <p>{{ line.title }}</p>
        {% endfor %}
        {% else %}
        <p>{{ text.no_shipping }}</p>
        {% endif %}
      </div>
    </div>
    <div class="clr"></div>
  </div>

  <div class="table">
    <div class="mp-row mp-heading">
      <div class="mp-item-bc">
        <span>{{ text.items }}<span>
        </span></span></div>
      <div class="mp-barcode-bc">
        <span></span>
      </div>
      <div class="mp-qty-bc mp-qty-bc-title">
        <span>{{ text.qty }}</span>
      </div>
      <div class="mp-price-bc">
        <span>{{ text.price }}</span>
      </div>
      <div class="mp-subtotal-bc">
        <span>{{ text.subtotal }}</span>
      </div>
    </div>
    {% for item in order.line_items %}
    <div class="mp-row odd" style="border-bottom: 1px solid #ddd;">
      <div class="mp-item-bc">
        <p class="product-name">{{ item.name }}</p>
        {% if item.sku %}
        <p class="sku">{{ text.sku }}: {{ item.sku }}</p>
        {% endif %}
        {% if item.variant_title %}
        <p class="sku">{{ text.variant }}: {{ item.variant_title }}</p>
        {% endif %}
        {% if item.sku and item.sku.size > 18 and configuration.barcode_enable %}
          <p class="sku">
            {{ item.sku | barcode }}
          </p>
        {% endif %}
      </div>
      <div class="mp-barcode-bc">
        {% if item.sku and item.sku.size <= 18 and configuration.barcode_enable %}
          <p>
            {{ item.sku | barcode }}
          </p>
        {% endif %}
      </div>
      <div class="mp-qty-bc">
        <span>{{ item.quantity }}</span>
      </div>
      <div class="mp-price-bc">
        <span class="price">{{ item.price | money: order.currency }}</span>
      </div>
      <div class="mp-subtotal-bc">
        <span class="price">{{ item.price | times: item.quantity | money: order.currency }}</span>
      </div>
    </div>
    <div class="clr"></div>
    {% endfor %}
    <div style="border-bottom: 1px solid #ddd;"></div>
  </div>
  <div class="order-totals">
    {% if order.total_discounts != "0.00" and order.discount_codes.size > 0 %}
      <div class="custom mp">
        <div class="totals-tax">
          <div class="mp-str">
            {{ text.discount }} ({{ order.discount_codes.0.code }})
          </div>
          <div class="mp-right" data-th="Tax">
            <span class="price">- {{ order.total_discounts | money: order.currency }}</span>
          </div>
        </div>
      </div>
    {% endif %}
    <div class="subtotal mp">
      <div class="mp-str">
        {{ text.subtotal }}
      </div>
      <div class="mp-right" data-th="Subtotal">
        <span class="price">{{ order.subtotal_price | divided_by: 1.21 | money: order.currency }}</span>
      </div>
    </div>
    {% if order.total_shipping != "0.00" %}
      <div class="custom mp">
        <div class="totals-tax">
          <div class="mp-str">
            {{ text.handle_shipping }}
          </div>
          <div class="mp-right" data-th="Tax">
            <span class="price">{{ order.total_shipping | divided_by: 1.21 | money: order.currency }}</span>
          </div>
        </div>
      </div>
    {% endif %}
    {% if order.total_tax != "0.00" %}
      <div class="custom mp">
        <div class="totals-tax">
          <div class="mp-str">
            {{ text.tax }}
          </div>
          <div class="mp-right" data-th="Tax">
            <span class="price">{{ order.total_tax | money: order.currency }}</span>
          </div>
        </div>
      </div>
    {% endif %}
    
    <div class="grand_total mp">
      <div class="mp-str">
        <strong>{{ text.grand_total }}</strong>
      </div>
      <div class="mp-right" data-th="Grand Total">
        <strong><span class="price">{{ order.total_price | money: order.currency }}</span></strong>
      </div>
    </div>
  </div>
  {% unless order.note == blank %}
    <footer>
      <div class="address">
        <div class="shipping-address">
          <h3 class="mp-block-heading">{{ text.notes }}</h3>
          <p class="text-note">{{ order.note }}</p>
        </div>
      </div>
    </footer>
  {% endunless %}
  <div class="clr"></div>
  <div>
    <h3 class="center">{{ text.thank_notes }}</h3>
  </div>
</div>
