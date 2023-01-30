 {% if draftOrder.tax_lines.0.rate > 0 and template.isOrderTax %}
      <div class="custom mp">
        <div class="totals-tax">
          <div class="mp-str">
            {% if draftOrder.tax_lines.0.rate > 0 %}
              {{ text.tax }}({{ draftOrder.tax_lines.0.rate | times: 100 }}%)
            {% else %}
              {{ text.tax }}
            {% endif %}
          </div>
          <div class="mp-right" data-th="Tax">
            <span class="price">{{ draftOrder.tax_lines.0.price | money: currency }}</span>
          </div>
        </div>
      </div>
    {% endif %}
    {% if draftOrder.tax_lines.1.rate > 0 and template.isOrderTax %}
      <div class="custom mp">
        <div class="totals-tax">
          <div class="mp-str">
            {% if draftOrder.tax_lines.1.rate > 0 %}
              {{ text.tax }}({{ draftOrder.tax_lines.1.rate | times: 100 }}%)
            {% else %}
              {{ text.tax }}
            {% endif %}
          </div>
          <div class="mp-right" data-th="Tax">
            <span class="price">{{ draftOrder.tax_lines.1.price | money: currency }}</span>
          </div>
        </div>
      </div>
      {% else %}