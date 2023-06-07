{% assign logoWidth = configuration.logoWidth | default: 150 %}
{% assign logoSize = template.logo_size | default: 100 %}
{% assign logoHeight = configuration.logoHeight | default: 75 %}
{% assign fontSize = template.fontSize | default: 16 %}
{% assign vatIDs = order.note_attributes | where: "name", "vat_id" %}
<style type="text/css">
  .blue-template-invoice.template-{{ template.id }}#wrapper * {
    font-size: {{ fontSize }}px;
  }
</style>
{% unless template.font_family == blank %}
<span>
  <link type="text/css" href="https://fonts.googleapis.com/css?family={{ template.font_family }}:100,100i,300,300i,400,400i,500,500i,700,700i&display=swap&subset=cyrillic,cyrillic-ext,greek,greek-ext,latin-ext,vietnamese" rel="stylesheet">
  <style type="text/css">
    .blue-template-invoice.template-{{ template.id }}#wrapper * {
      font-family: '{{ template.font_family | replace: "+", " " }}', serif;
    }
  </style>
</span>
{% endunless %}
{% assign currency = order.currency %}
{% if template.templateCurrency == "billing" %}
  {% assign currency = order.presentment_currency %}
{% endif %}
<div id="wrapper" class="blue-template-invoice template-{{ template.id }}">
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
        <p>
          <strong>{{ configuration.name }}</strong>
        </p>
        {% if configuration.address != "" %}
          <p>{{ text.address }}: {{ configuration.address }}</p>
        {% endif %}
        {% if configuration.phone != "" %}
          <p>{{ text.phone }}: {{ configuration.phone }}</p>
        {% endif %}
        {% if configuration.vat_number != "" %}
          <p>{{ text.tax_id }}: {{ configuration.vat_number }} </p>
        {% endif %}
        {% if configuration.email != "" %}
          <p>{{ text.contact }}: {{ configuration.email }}</p>
        {% endif %}
        {% if configuration.registered_number != "" %}
          <p>{{ text.registered }}: {{ configuration.registered_number }}</p>
        {% endif %}
      </div>
    </div>
    <div class="header-right">
      <div class="info">
        <h1 class="info-title">{{ text.invoice | upcase }}</h1>
        {% if template.isOrderNumber %}
          {% if template.isCustomOrderNumber %}
            <p>{{ text.invoice }} <b>{{ template.orderNumberPrefix }}{{ order.order_number }}{{ template.orderNumberSuffix }}</b></p>
          {% else %}
            <p>{{ text.invoice }} <b>{{ order.name }}</b></p>
          {% endif %}
        {% endif %}
        {% if template.isOrderDate %}
          {% if template.isOrderGeneratedDate %}
            <p>{{ text.invoice_date }}: <b>{{ "now" | date: template.formatDate }}</b></p>
          {% else %}
            <p>{{ text.invoice_date }}: <b>{{ order.created_at | date: template.formatDate }}</b></p>
          {% endif %}
        {% endif %}
        {% if template.isOrderAmount %}
          {% if template.templateCurrency == "billing" %}
            <p>{{ text.invoice_amount }}: <b><span class="price">{{ order.automatic_total_price | money: currency }}</span></b></p>
          {% else %}
            <p>{{ text.invoice_amount }}: <b><span class="price">{{ order.total_price | money: currency }}</span></b></p>
          {% endif %}
        {% endif %}
        {% if template.isOrderBarcode %}
          {% if configuration.barcode_enable %}
            <p class="mp-invoice-barcode">
              {{ order.name | barcode }}
            </p>
          {% endif %}
        {% endif %}
      </div>
    </div>
  </div>
  <div class="clr"></div>
  <div class="content">
    <div class="address">
      <div class="billing-address">
        <h3 class="mp-block-heading">{{ text.payment_address }}</h3>
        <p>{{ order.shipping_address.name | default: text.no_payment_address }}<br/>
          {% if template.isPaymentAddress %}
            {{ order.shipping_address.address1 }}<br/>
            {% unless order.shipping_address.address2 == blank %}
              {{ order.shipping_address.address2 }}<br/>
            {% endunless %}
            {{ order.shipping_address.city }}<br/>
            {{ order.shipping_address.country }}<br/>
          {% endif %}
          {% if vatIDs.size > 0 %}
            {{ text.vat_tax_id }}: {{ vatIDs.0.value }} <br/>
          {% endif %}
          {% if order.contact_email %}
            T: <a href="tel:{{ order.contact_email.email }}">{{ order.contact_email }}</a><br/>
          {% endif %}
          {% if order.phone %}
            T: <a href="tel:{{ order.shipping_address.phone }}">{{ order.phone }}</a>
          {% endif %}
        </p>
      </div>
      <div class="payment-method">
        <h3 class="mp-block-heading">{{ text.payment_method }}</h3>
        {% if template.isPaymentMethod %}
          {% if order.payment_gateway_names.size > 0 %}
            <p>{{ order.payment_gateway_names.0 }}</p>
            {% if order.payment_details and template.isCreditCardNumber %}
              <p>{{ text.card_number }}: {{ order.payment_details.credit_card_number }}</p>
            {% endif %}
          {% else %}
          <p>{{ text.no_billing }}</p>
          {% endif %}
        {% endif %}
      </div>
    </div>
    <div class="clr"></div>
  </div>

  <div class="table table-relative">
    <div class="mp-row mp-heading">
      <div class="mp-item-bc">
        <span>{{ text.items }}</span>
      </div>
      <div class="mp-subtotal-bc">
        <span>{{ text.subtotal }}</span>
      </div>
      <div class="mp-price-bc">
        <span>{{ text.price }}</span>
      </div>
      {% if template.isItemDiscount %}
        <div class="mp-price-bc">
          <span>{{ text.discount }}</span>
        </div>
      {% endif %}
      <div class="mp-qty-bc mp-qty-bc-title">
        <span>{{ text.qty }}</span>
      </div>
    </div>
    {% for item in order.line_items %}
    <div class="mp-row odd table-border table-row">
      <div class="mp-item-bc">
        {% if template.isItemImage %}
          <div class="mp-item-img">
            <img src="{{ item.imageSrc | replace: '.png', '_small.png' | replace: '.jpg', '_small.jpg' }}" alt="{{ item.imageAlt }}" class="mp-item-image"/>
          </div>
        {% endif %}
        <div class="mp-item-content">
          <p class="product-name">{{ item.name }}</p>
          {% if item.sku and template.isItemSKU %}
            <p class="sku">{{ text.sku }}: {{ item.sku }}</p>
          {% endif %}
          {% if item.variant_title %}
            <p class="sku">{{ text.variant }}: {{ item.variant_title }}</p>
          {% endif %}
          {% if item.sku and configuration.barcode_enable and template.isItemBarCode %}
            <p class="sku">
              {{ item.sku | barcode }}
            </p>
          {% endif %}
        </div>
      </div>
      <div class="mp-subtotal-bc">
        <span class="price">
          {% if template.templateCurrency == "billing" %}
            {{ item.automatic_price | minus: item.automatic_total_discount | times: item.quantity | money: currency }}
          {% else %}
            {{ item.price | minus: item.total_discount | times: item.quantity | money: currency }}
          {% endif %}
        </span>
      </div>
      <div class="mp-price-bc">
        {% if template.templateCurrency == "billing" %}
          <span class="price">{{ item.automatic_price | money: currency }}</span>
        {% else %}
          <span class="price">{{ item.price | money: currency }}</span>
        {% endif %}
      </div>
      {% if template.isItemDiscount %}
        <div class="mp-price-bc">
          {% if template.templateCurrency == "billing" %}
            <span class="price">{{ item.automatic_total_discount | money: currency }}</span>
          {% else %}
            <span class="price">{{ item.total_discount | money: currency }}</span>
          {% endif %}
        </div>
      {% endif %}
      <div class="mp-qty-bc">
        <span>{{ item.quantity }}</span>
      </div>
    </div>
    <div class="clr"></div>
    {% endfor %}
    <div style="border-bottom: 1px solid #ddd;"></div>
    {% if order.line_items.size > 0 %}
      <div class="order-status-absolute">
        {% if template.isPaidWatermark %}
          {% if order.financial_status == 'paid' %}
            <img src="https://cdn1.avada.io/pdf-invoice/paid.png" alt="Paid badge" class="order-status-img-absolute" />
          {% else %}
            <img src="https://cdn1.avada.io/pdf-invoice/unpaid.png" alt="Paid required" class="order-status-img-absolute" />
          {% endif %}
        {% endif %}
      </div>
    {% endif %}
  </div>
  <div class="order-totals">
    {% if order.total_discounts !== "0.00" and template.isOrderDiscount %}
      <div class="custom mp">
        <div class="totals-tax">
          <div class="mp-str">
            {{ text.discount }}
            {% if order.discount_codes.size > 0 %}
              ({{ order.discount_codes.0.code }})
            {% endif %}
          </div>
          <div class="mp-right" data-th="Tax">
            {% if template.templateCurrency == "billing" %}
              <span class="price">- {{ order.automatic_total_discounts | money: currency }}</span>
            {% else %}
              <span class="price">- {{ order.total_discounts | money: currency }}</span>
            {% endif %}
          </div>
        </div>
      </div>
    {% endif %}
    {% if template.isOrderSubtotal %}
      <div class="subtotal mp">
        <div class="mp-str">
          {{ text.subtotal }}
        </div>
        <div class="mp-right" data-th="Subtotal">
          {% if template.templateCurrency == "billing" %}
            <span class="price">{{ order.automatic_subtotal_price | money: currency }}</span>
          {% else %}
            <span class="price">{{ order.subtotal_price | money: currency }}</span>
          {% endif %}
        </div>
      </div>
    {% endif %}
    {% if order.total_tax !== "0.00" and template.isOrderTax %}
      <div class="custom mp">
        <div class="totals-tax">
          <div class="mp-str">
            {% if order.tax_lines.size > 0 %}
              {{ text.tax }}({{ order.tax_lines.0.rate }})
            {% else %}
              {{ text.tax }}
            {% endif %}
          </div>
          <div class="mp-right" data-th="Tax">
            {% if template.templateCurrency == "billing" %}
              <span class="price">{{ order.automatic_total_tax | money: currency }}</span>
            {% else %}
              <span class="price">{{ order.total_tax | money: currency }}</span>
            {% endif %}
          </div>
        </div>
      </div>
    {% else %}
      {% if template.isTaxesInvoices %}
        {% for item in template.taxesInvoices %}
          {% assign per = item.percentage | plus:100 %}
          {% assign tax_rate = item.percentage | divided_by: per %}
          {% assign tax = order.total_price | times: tax_rate %}
          <div class="custom mp">
            <div class="totals-tax">
              <div class="mp-str">
                {{ item.taxName }}({{ item.percentage }}%)
              </div>
              <div class="mp-right" data-th="Tax">
                <span class="price">{{ tax | money: currency }}</span>
              </div>
            </div>
          </div>
        {% endfor %}
      {% endif %}
    {% endif %}
    {% if order.total_shipping !== "0.00" %}
      <div class="custom mp">
        <div class="totals-tax">
          <div class="mp-str">
            {{ text.handle_shipping }}
          </div>
          <div class="mp-right" data-th="Tax">
            {% if template.templateCurrency == "billing" %}
              <span class="price">{{ order.automatic_total_shipping | money: currency }}</span>
            {% else %}
              <span class="price">{{ order.total_shipping | money: currency }}</span>
            {% endif %}
          </div>
        </div>
      </div>
    {% endif %}
    <div class="grand_total mp">
      <div class="mp-str">
        <strong>{{ text.grand_total }}</strong>
      </div>
      <div class="mp-right" data-th="Grand Total">
        {% if template.templateCurrency == "billing" %}
          <strong><span class="price">{{ order.automatic_total_price | money: currency }}</span></strong>
        {% else %}
          <strong><span class="price">{{ order.total_price | money: currency }}</span></strong>
        {% endif %}
      </div>
    </div>
  </div>
  <div class="clr"></div>
  {% unless order.note == blank %}
    {% if template.isOrderNote %}
      <footer>
        <div class="address">
          <div class="shipping-address">
            <h3 class="mp-block-heading">{{ text.notes }}</h3>
            <p class="text-note">{{ order.note }}</p>
          </div>
        </div>
      </footer>
    {% endif %}
  {% endunless %}
  <div class="clr"></div>
  {% if template.isOrderFooterNote %}
  <div>
    <p class="center">{{ template.orderFooterNote | newline_to_br }}</p>
  </div>
  {% endif %}
  <div class="clr"></div>
  {% if template.isThankYouNote %}
    {% if template.thankYouNote == 'Thank you for your business' %}
      <div>
        <h3 class="center">
          {{ text.thank_notes | newline_to_br }}
        </h3>
      </div>
    {% else %}
      <div>
        <h3 class="center">
          {{ template.thankYouNote | newline_to_br }}
        </h3>
      </div>
    {% endif %}
  {% endif %}
  <div class="clr"></div>
  <div style="height: 50px"></div>
  {% if template.isFooterWebsite %}
    <div class="center website-address">
      <a href="https://{{ template.websiteUrl }}" target="_blank">{{ template.websiteUrl }}</a>
    </div>
  {% endif %}
  <div class="center shop-socials">
    {% if template.isFooterFacebook %}
      <a href="{{ template.facebookUrl }}" target="_blank">
        <img class="social-icons" src="https://cdn.shopify.com/s/files/1/0398/5025/files/Fb_icon.jpg?11755453313570768267" />
      </a>
    {% endif %}
    {% if template.isFooterInstagram %}
      <a href="{{ template.instagramUrl }}" target="_blank">
        <img class="social-icons" src="https://cdn.shopify.com/s/files/1/0398/5025/files/instagram_9.png?576915513262272927" />
      </a>
    {% endif %}
    {% if template.isFooterTwitter %}
      <a href="{{ template.twitterUrl }}" target="_blank">
        <img class="social-icons" src="https://cdn.shopify.com/s/files/1/0398/5025/files/twitter_Icon.png?11314827648007113849" />
      </a>
    {% endif %}
  </div>
  {% if template.isPolicyPage %}
    <br><div style="page-break-after:always;clear:both;"></div>
    <div style="padding-top: 20px;">
      {{ template.policyPage }}
    </div>
  {% endif %}
</div>



