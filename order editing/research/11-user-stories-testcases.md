# User Stories & Test Cases
# Avada Order Editing

---

## P0 Features (MVP)

---

### Feature 1: Customer Self-Service Address Editing

**User Story (US-01)**
As a **customer**, I want to edit my shipping address after placing an order, so that my package arrives at the correct location without contacting support.

**Acceptance Criteria**

| # | Given | When | Then |
|---|-------|------|------|
| AC-1.1 | An order is unfulfilled and within the edit window | The customer clicks "Edit Order" and changes the shipping address | The order's shipping address is updated in Shopify and a confirmation is shown |
| AC-1.2 | An order is unfulfilled and within the edit window | The customer submits an address with missing required fields (city, zip) | An inline validation error is shown for each missing field |
| AC-1.3 | An order's edit window has expired | The customer visits the edit page | The address fields are disabled and a message says "Edit window has closed" |
| AC-1.4 | An order is partially fulfilled | The customer tries to edit the address | The system shows "This order has begun fulfillment and the address can no longer be changed" |
| AC-1.5 | An order has a valid address update | The edit is confirmed | Both the customer and merchant receive email notifications |

**Test Cases**

| ID | Type | Scenario | Steps | Expected Result |
|----|------|----------|-------|-----------------|
| TC-1.1 | Happy path | Edit address successfully | 1. Customer opens order status page 2. Clicks "Edit Order" 3. Changes street address 4. Clicks "Save Changes" | Address updated, confirmation shown, email sent |
| TC-1.2 | Happy path | Edit all address fields | Change street, city, state, zip, country | All fields updated in Shopify order |
| TC-1.3 | Edge case | Edit window expires during editing | Customer opens edit form, waits until window expires, then submits | Submission rejected with "Edit window expired" message |
| TC-1.4 | Edge case | Order fulfilled between page load and submit | Merchant fulfills order while customer is editing | Submission rejected with "Order already shipped" message |
| TC-1.5 | Edge case | International address with special characters | Enter address with accents, umlauts, CJK characters | Characters preserved correctly in Shopify |
| TC-1.6 | Error | Empty required fields | Submit with blank city and zip | Inline validation errors on city and zip fields |
| TC-1.7 | Error | Invalid country/zip combination | Enter US country with non-US zip format | Validation error: "Invalid postal code for selected country" |
| TC-1.8 | Error | Shopify API failure | Shopify returns 500 during address update | User-friendly error: "Something went wrong. Please try again." with retry button |
| TC-1.9 | Edge case | Same address submitted | Customer saves without making changes | No API call made, toast: "No changes detected" |
| TC-1.10 | Edge case | PO Box address where merchant disallows | Merchant has "no PO Box" rule enabled, customer enters PO Box | Validation error shown |

---

### Feature 2: Customer Self-Service Item/Variant Swap

**User Story (US-02)**
As a **customer**, I want to swap a product variant (size, color) on my order, so that I get the right item without contacting support.

**Acceptance Criteria**

| # | Given | When | Then |
|---|-------|------|------|
| AC-2.1 | An unfulfilled order within the edit window | The customer selects a different variant (e.g., size M to L) of the same product | The line item is updated with the new variant |
| AC-2.2 | The new variant has a higher price | The customer confirms the swap | A price difference summary is shown; an invoice is sent for the additional amount |
| AC-2.3 | The new variant has a lower price | The customer confirms the swap | A refund for the difference is automatically issued |
| AC-2.4 | The new variant is out of stock | The customer tries to select it | The variant is shown as unavailable/grayed out |
| AC-2.5 | The merchant has restricted swaps for this product via edit rules | The customer opens the edit page | The swap option is hidden for restricted products |

**Test Cases**

| ID | Type | Scenario | Steps | Expected Result |
|----|------|----------|-------|-----------------|
| TC-2.1 | Happy path | Swap same-price variant | Swap size M to L (same price) | Variant updated, no charge, confirmation email sent |
| TC-2.2 | Happy path | Swap to higher-price variant | Swap Cotton to Silk (+$15) | Price diff shown, customer confirms, invoice sent for $15 |
| TC-2.3 | Happy path | Swap to lower-price variant | Swap XL to S (-$5) | Price diff shown, $5 refund issued on confirm |
| TC-2.4 | Edge case | Swap when only 1 unit of new variant remains | Swap to variant with inventory = 1 | Swap succeeds, inventory decremented to 0 |
| TC-2.5 | Edge case | Two customers swap to same last-in-stock variant simultaneously | Customer A and B both try to swap to last unit | First to confirm succeeds; second gets "Out of stock" error |
| TC-2.6 | Edge case | Variant with multiple options (size + color) | Swap from "Red / M" to "Blue / L" | Both option values updated correctly |
| TC-2.7 | Edge case | Product has only one variant | Customer opens edit for single-variant product | Swap option is hidden (nothing to swap to) |
| TC-2.8 | Error | Shopify orderEditBegin fails | API returns "Order cannot be edited" | Error message shown, no partial changes applied |
| TC-2.9 | Error | orderEditCommit fails after addVariant | Commit returns error | Edit rolled back, customer notified, no charge applied |
| TC-2.10 | Edge case | Swap variant on order with discount code | Order has 20% off code, swap to different variant | Discount still applied to new variant at correct percentage |
| TC-2.11 | Edge case | Swap back to original variant | Customer swaps M->L, then L->M before confirming | Net zero change, original state restored |

---

### Feature 3: Customer Self-Service Quantity Adjustment

**User Story (US-03)**
As a **customer**, I want to change the quantity of items in my order, so that I can add or remove items before shipment.

**Acceptance Criteria**

| # | Given | When | Then |
|---|-------|------|------|
| AC-3.1 | An unfulfilled order within the edit window | The customer increases the quantity of a line item | The quantity is updated and the price difference is calculated |
| AC-3.2 | An unfulfilled order within the edit window | The customer decreases the quantity (but not to zero) | The quantity is updated and a partial refund is calculated |
| AC-3.3 | The customer decreases quantity to zero | The customer sets quantity to 0 | The line item is removed (equivalent to item removal) |
| AC-3.4 | Increasing quantity exceeds available inventory | The customer tries to add more than available stock | An error shows "Only X units available" |
| AC-3.5 | The merchant has set max quantity rules | The customer tries to exceed the max | An error shows "Maximum X units per order for this product" |

**Test Cases**

| ID | Type | Scenario | Steps | Expected Result |
|----|------|----------|-------|-----------------|
| TC-3.1 | Happy path | Increase quantity by 1 | Change qty from 1 to 2 for $25 item | Price diff +$25 shown, invoice sent on confirm |
| TC-3.2 | Happy path | Decrease quantity | Change qty from 3 to 1 for $25 item | Price diff -$50 shown, refund issued on confirm |
| TC-3.3 | Happy path | Remove item via qty=0 | Set quantity to 0 | Line item removed, refund for full item price |
| TC-3.4 | Edge case | Reduce to zero on last item | Order has 1 line item, customer sets qty to 0 | Redirect to cancellation flow (cannot have empty order) |
| TC-3.5 | Edge case | Increase beyond inventory | Inventory = 3, customer tries qty = 5 | Stepper capped at 3 with "Only 3 available" message |
| TC-3.6 | Edge case | Merchant minQuantity = 2 | Customer tries to set qty to 1 | Error: "Minimum 2 units required for this product" |
| TC-3.7 | Edge case | Quantity change with percentage discount | Item has 20% off, change qty from 1 to 3 | Discount applied to all 3 units correctly |
| TC-3.8 | Error | Inventory changes between load and submit | Page shows 5 available, but drops to 2 before submit | Error on submit: "Only 2 units now available" |
| TC-3.9 | Edge case | Large quantity increase | Change qty from 1 to 100 | Depends on inventory; if available, price diff calculated correctly |
| TC-3.10 | Edge case | Free item (price = $0) | Change qty of free item | No price diff, quantity updated |

---

### Feature 4: Customer Self-Service Order Cancellation

**User Story (US-04)**
As a **customer**, I want to cancel my order within the allowed time window, so that I can get a refund without waiting for support.

**Acceptance Criteria**

| # | Given | When | Then |
|---|-------|------|------|
| AC-4.1 | An unfulfilled order within the cancellation window | The customer clicks "Cancel Order" and confirms | The order is cancelled in Shopify, a full refund is issued, and inventory is restocked |
| AC-4.2 | An order outside the cancellation window | The customer tries to cancel | A message says "Cancellation window has closed. Please contact support." |
| AC-4.3 | A partially fulfilled order | The customer tries to cancel | A message says "This order has begun shipping and cannot be cancelled" |
| AC-4.4 | The merchant has disabled customer cancellation | The customer views the edit widget | The "Cancel Order" button/link is not shown |
| AC-4.5 | The customer cancels an order | The cancellation is processed | Both customer and merchant receive cancellation confirmation emails |

**Test Cases**

| ID | Type | Scenario | Steps | Expected Result |
|----|------|----------|-------|-----------------|
| TC-4.1 | Happy path | Cancel unfulfilled order | 1. Click "Cancel Order" 2. Select reason 3. Confirm cancellation | Order cancelled, full refund issued, inventory restocked |
| TC-4.2 | Happy path | Cancel multi-item order | Cancel order with 3 line items | All items refunded, all inventory restocked |
| TC-4.3 | Edge case | Cancel after editing | Customer edits order (swap), then cancels | Cancellation uses current (edited) state, correct refund amount |
| TC-4.4 | Edge case | Cancel order paid with gift card + credit card | Order split across payment methods | Each payment method refunded proportionally |
| TC-4.5 | Edge case | Window expires during cancellation flow | Customer on confirmation screen when window expires | Cancellation rejected: "Cancellation window expired" |
| TC-4.6 | Edge case | Merchant fulfills during cancellation flow | Merchant ships while customer is on cancel page | Cancellation rejected: "Order has been shipped" |
| TC-4.7 | Error | Shopify orderCancel API fails | API returns 500 | Error: "Unable to cancel. Please try again or contact support." |
| TC-4.8 | Error | Refund processing fails | Order cancelled but refund fails | Order cancelled, merchant notified of pending refund, customer shown "Refund is being processed" |
| TC-4.9 | Edge case | Double-click cancel button | Customer clicks confirm twice rapidly | Idempotent: only one cancellation processed |
| TC-4.10 | Edge case | Cancel order with $0 total (fully discounted) | Cancel free order | Order cancelled, no refund needed, inventory restocked |

---

### Feature 5: Merchant Admin Order Editing

**User Story (US-13)**
As a **merchant**, I want to edit orders myself from the admin panel, so that I can handle phone/email requests from customers quickly.

**Acceptance Criteria**

| # | Given | When | Then |
|---|-------|------|------|
| AC-5.1 | The merchant is logged into the admin app | They select an order and click "Edit Order" | An edit form opens with the order's current line items, quantities, and address |
| AC-5.2 | The merchant makes changes and saves | The changes are submitted | The order is updated in Shopify via orderEditBegin/Commit and a record is saved |
| AC-5.3 | The merchant enables "Notify Customer" | The edit is saved | The customer receives an email notification about the changes |
| AC-5.4 | The merchant adds a staff note | The edit is saved | The note is saved in the orderEdit record and visible in the edit history |
| AC-5.5 | The order is already fulfilled | The merchant tries to edit | The edit button is disabled with tooltip "Cannot edit fulfilled orders" |

**Test Cases**

| ID | Type | Scenario | Steps | Expected Result |
|----|------|----------|-------|-----------------|
| TC-5.1 | Happy path | Merchant swaps variant | Open order, swap size M to L, save | Variant updated in Shopify, edit history recorded |
| TC-5.2 | Happy path | Merchant changes quantity | Open order, change qty from 2 to 3, save | Quantity updated, price diff calculated, invoice sent to customer |
| TC-5.3 | Happy path | Merchant adds new product | Open order, search product, add to order, save | New line item added via orderEditAddVariant |
| TC-5.4 | Happy path | Merchant removes line item | Open order, click remove on line item, save | Item removed, refund issued automatically |
| TC-5.5 | Happy path | Merchant edits address | Open order, change address fields, save | Address updated via orderUpdate mutation |
| TC-5.6 | Edge case | Merchant edits order that customer is also editing | Both open edit form simultaneously | First to commit succeeds, second gets conflict error |
| TC-5.7 | Edge case | Merchant edits order outside customer edit window | Edit window expired but merchant wants to edit | Merchant can still edit (no time window restriction for merchants) |
| TC-5.8 | Error | Merchant session token expires during edit | Token expires mid-edit | App Bridge re-authenticates, edit state preserved |
| TC-5.9 | Edge case | Merchant adds product then removes it before saving | Add product, then remove it | No net change; "No changes to save" message |
| TC-5.10 | Edge case | Edit order with 50+ line items | Large order opened for editing | Page loads within 3 seconds, all items editable |

---

### Feature 6: Time-Window Controls

**User Story (US-09)**
As a **merchant**, I want to set a time window for how long after order placement customers can make edits, so that edits do not interfere with fulfillment.

**Acceptance Criteria**

| # | Given | When | Then |
|---|-------|------|------|
| AC-6.1 | The merchant is in Settings | They set the edit window to "2 hours" | All new orders get a 2-hour edit window from order creation time |
| AC-6.2 | The window type is "before_fulfillment" | An order is created | The edit window stays open until fulfillment begins, regardless of time |
| AC-6.3 | The window type is "minutes" and set to 120 | 121 minutes pass since order creation | The edit window status changes to "closed" |
| AC-6.4 | The merchant changes the window from 1 hour to 3 hours | Existing orders have 1-hour windows | Existing orders keep their 1-hour window; only new orders get 3 hours |

**Test Cases**

| ID | Type | Scenario | Steps | Expected Result |
|----|------|----------|-------|-----------------|
| TC-6.1 | Happy path | Set 30-minute window | Settings > Time window > 30 minutes > Save | New orders editable for 30 minutes |
| TC-6.2 | Happy path | Set "until fulfillment" mode | Settings > Time window > "Until fulfillment starts" > Save | Orders remain editable until fulfillment begins |
| TC-6.3 | Happy path | Window expires automatically | Create order, wait for window to expire | Scheduled function closes the edit window, widget shows "expired" |
| TC-6.4 | Edge case | Very short window (5 minutes) | Set 5-minute window | Window functions correctly for 5 minutes |
| TC-6.5 | Edge case | Very long window (72 hours) | Set 72-hour window | Window functions correctly for 72 hours |
| TC-6.6 | Edge case | Timezone considerations | Merchant in UTC+9, customer in UTC-5 | Window calculated from order creation UTC timestamp, timezone-agnostic |
| TC-6.7 | Edge case | Change window while orders are open | Change from 2h to 30m while orders have 2h windows | Existing orders unaffected, new orders get 30m |
| TC-6.8 | Error | Invalid window value (0 or negative) | Enter 0 or -1 in window field | Validation error: "Window must be at least 5 minutes" |

---

### Feature 7: Automatic Refund/Charge on Price Changes

**User Story (US-10)**
As a **merchant**, I want edits to automatically handle refunds and additional charges, so that I do not have to process payments manually.

**Acceptance Criteria**

| # | Given | When | Then |
|---|-------|------|------|
| AC-7.1 | An edit results in a lower total | The edit is committed | A refund is automatically issued to the original payment method |
| AC-7.2 | An edit results in a higher total | The edit is committed | An invoice is sent to the customer for the additional amount |
| AC-7.3 | An edit has no price change | The edit is committed | No payment action is taken |
| AC-7.4 | A refund fails | The system attempts to refund | The merchant is notified; the edit is still applied; the refund is retried |
| AC-7.5 | The price diff summary is shown before confirmation | The customer reviews changes | A clear breakdown shows original total, new total, and difference |

**Test Cases**

| ID | Type | Scenario | Steps | Expected Result |
|----|------|----------|-------|-----------------|
| TC-7.1 | Happy path | Refund on downgrade | Swap $50 item to $30 item | $20 refund issued automatically |
| TC-7.2 | Happy path | Charge on upgrade | Swap $30 item to $50 item | Invoice for $20 sent to customer |
| TC-7.3 | Happy path | No price change | Swap same-price variant | No payment action, edit committed |
| TC-7.4 | Happy path | Multiple changes with net refund | Remove $20 item, add $10 item | Net $10 refund issued |
| TC-7.5 | Edge case | Refund to expired credit card | Card on file is expired | Shopify handles via original payment method fallback |
| TC-7.6 | Edge case | Fractional cents in price diff | Changes result in $0.005 diff | Rounded to nearest cent per Shopify behavior |
| TC-7.7 | Edge case | Tax recalculation on address change | Change address to different tax jurisdiction | Tax recalculated, price diff includes tax change |
| TC-7.8 | Error | Payment gateway timeout | Gateway times out during charge | Retry mechanism, customer notified of pending charge |
| TC-7.9 | Edge case | Free shipping threshold crossed | Remove item, total drops below free shipping threshold | Shipping cost added to new total if applicable |
| TC-7.10 | Edge case | Currency formatting | Store currency is JPY (no decimals) | Price diff shown correctly without decimal places |

---

### Feature 8: Inventory Restocking on Cancel/Edit

**User Story (US-11)**
As a **merchant**, I want inventory to be automatically restocked when items are removed or swapped, so that my stock levels stay accurate.

**Acceptance Criteria**

| # | Given | When | Then |
|---|-------|------|------|
| AC-8.1 | A line item is removed from an order | The edit is committed | The removed item's inventory is restocked at the original location |
| AC-8.2 | A variant is swapped | The edit is committed | The old variant is restocked and the new variant is decremented |
| AC-8.3 | An order is cancelled | The cancellation is confirmed | All line items are restocked |
| AC-8.4 | The product does not track inventory | An item is removed | No inventory operation is performed (no error) |

**Test Cases**

| ID | Type | Scenario | Steps | Expected Result |
|----|------|----------|-------|-----------------|
| TC-8.1 | Happy path | Remove item restocks | Remove 2 units of SKU-A (inventory was 10) | Inventory for SKU-A becomes 12 |
| TC-8.2 | Happy path | Swap restocks old, decrements new | Swap SKU-A (inv 10) to SKU-B (inv 5) | SKU-A becomes 11, SKU-B becomes 4 |
| TC-8.3 | Happy path | Cancel restocks all | Cancel order with 3 items (2x SKU-A, 1x SKU-B) | SKU-A += 2, SKU-B += 1 |
| TC-8.4 | Edge case | Multi-location inventory | Store has warehouse + retail locations | Inventory restocked to the location it was allocated from |
| TC-8.5 | Edge case | Product deleted after order placed | Product no longer exists | Restock silently skipped, edit still succeeds |
| TC-8.6 | Edge case | Inventory not tracked | Product has "Track inventory" disabled | No restock operation, no error |
| TC-8.7 | Edge case | Decrease quantity (partial removal) | Change qty from 3 to 1 | 2 units restocked |
| TC-8.8 | Error | Inventory API fails | Shopify inventory adjustment returns error | Edit still committed, restock retried via background job |

---

### Feature 9: Email Notifications for Edits

**User Story (US-12)**
As a **merchant**, I want customers and staff to receive email notifications when edits are made, so that everyone stays informed.

**Acceptance Criteria**

| # | Given | When | Then |
|---|-------|------|------|
| AC-9.1 | A customer edits their order | The edit is committed | The customer receives an "Order Updated" email with change details |
| AC-9.2 | A customer edits their order | The edit is committed | The merchant receives a notification email (if enabled) |
| AC-9.3 | A customer cancels their order | The cancellation is processed | Both customer and merchant receive cancellation emails |
| AC-9.4 | A merchant edits an order with "Notify Customer" checked | The edit is committed | The customer receives an "Order Updated" email |
| AC-9.5 | The merchant has disabled merchant notifications | An edit is made | No email is sent to the merchant |

**Test Cases**

| ID | Type | Scenario | Steps | Expected Result |
|----|------|----------|-------|-----------------|
| TC-9.1 | Happy path | Customer edit notification | Customer swaps variant, confirms | Customer gets email with old vs. new variant details |
| TC-9.2 | Happy path | Merchant notification | Customer edits order | Merchant receives email with order number, change summary, customer name |
| TC-9.3 | Happy path | Cancellation notification | Customer cancels order | Both parties get cancellation email with refund amount |
| TC-9.4 | Happy path | Merchant edit with notify | Merchant edits order, checks "Notify Customer" | Customer gets email about merchant-initiated changes |
| TC-9.5 | Edge case | Invalid customer email | Customer email is invalid | Email send fails silently, edit still committed, failure logged |
| TC-9.6 | Edge case | Multiple edits in quick succession | Customer edits 3 times in 5 minutes | Each edit triggers its own notification (not batched) |
| TC-9.7 | Edge case | Email service down | SendGrid/Mailgun returns 500 | Email queued for retry via Pub/Sub, edit not blocked |
| TC-9.8 | Edge case | Very long change description | 20+ changes in one edit | Email truncates with "View all changes" link |

---

### Feature 10: Order Status Page Widget (Theme Extension)

**User Story (US-06)**
As a **customer**, I want to access order editing from the Order Status Page, so that I can make changes easily after checkout.

**Acceptance Criteria**

| # | Given | When | Then |
|---|-------|------|------|
| AC-10.1 | An order is within the edit window | The customer views the Order Status Page | The "Edit Order" widget is visible with a countdown timer |
| AC-10.2 | The edit window has expired | The customer views the Order Status Page | The widget shows "Edit window has closed" with disabled buttons |
| AC-10.3 | The order is fulfilled | The customer views the Order Status Page | The widget shows "This order has been shipped" |
| AC-10.4 | The merchant has the app installed and activated | The theme has app blocks enabled | The widget renders in the designated app block location |

**Test Cases**

| ID | Type | Scenario | Steps | Expected Result |
|----|------|----------|-------|-----------------|
| TC-10.1 | Happy path | Widget renders with countdown | Visit order status page for editable order | Widget shows with "Edit Order" button and countdown timer |
| TC-10.2 | Happy path | Click "Edit Order" | Click the primary button | Redirected to edit order page with order context |
| TC-10.3 | Edge case | Countdown reaches zero while viewing | Timer expires while page is open | Widget transitions to "expired" state without page reload |
| TC-10.4 | Edge case | App uninstalled but block remains | Merchant uninstalls app | Widget gracefully hidden (no broken layout) |
| TC-10.5 | Edge case | Multiple browser tabs | Order status open in 2 tabs, edit in one | Second tab reflects updated state on next API call |
| TC-10.6 | Edge case | Theme with no app block support | Vintage theme without app blocks | Scripttag fallback renders widget |
| TC-10.7 | Happy path | Mobile rendering | View on 375px width phone | Buttons stack vertically, countdown visible, fully usable |

---

### Feature 11: Thank-You Page Widget (Theme Extension)

**User Story (US-07)**
As a **customer**, I want to access order editing from the Thank You Page, so that I can fix mistakes immediately after placing my order.

**Acceptance Criteria**

| # | Given | When | Then |
|---|-------|------|------|
| AC-11.1 | The customer has just completed checkout | The Thank You Page loads | An "Edit Order" banner is visible with a clear call-to-action |
| AC-11.2 | The customer clicks "Edit My Order" | They click the button | They are redirected to the edit order page |
| AC-11.3 | The merchant has disabled the Thank-You Page widget | A customer completes checkout | No widget is shown |

**Test Cases**

| ID | Type | Scenario | Steps | Expected Result |
|----|------|----------|-------|-----------------|
| TC-11.1 | Happy path | Banner renders after checkout | Complete checkout | Banner appears with "Made a mistake?" messaging |
| TC-11.2 | Happy path | Click through to edit | Click "Edit My Order" | Redirected to edit page with order pre-loaded |
| TC-11.3 | Edge case | Page refresh | Refresh thank-you page | Widget still renders correctly |
| TC-11.4 | Edge case | Quick checkout (Shop Pay) | Complete via Shop Pay | Widget renders on thank-you page |
| TC-11.5 | Edge case | Merchant disabled widget | Widget disabled in settings | Thank-you page loads without the widget |
| TC-11.6 | Happy path | Mobile rendering | Complete checkout on mobile | Banner is full-width, button easily tappable |

---

### Feature 12: Mobile-Responsive Editing Interface

**User Story**
As a **customer**, I want the editing interface to work well on my phone, so that I can fix my order on any device.

**Acceptance Criteria**

| # | Given | When | Then |
|---|-------|------|------|
| AC-12.1 | The customer is on a mobile device (320-428px width) | They open the edit page | All elements are visible, scrollable, and tappable without horizontal scrolling |
| AC-12.2 | The customer is on a tablet (768-1024px) | They open the edit page | Layout adapts to tablet width with appropriate spacing |
| AC-12.3 | Any input field is focused on mobile | The keyboard opens | The form scrolls to keep the active field visible |

**Test Cases**

| ID | Type | Scenario | Steps | Expected Result |
|----|------|----------|-------|-----------------|
| TC-12.1 | Happy path | iPhone SE (375px) | Complete full edit flow | All steps completable, no horizontal scroll, buttons full-width |
| TC-12.2 | Happy path | Android phone (360px) | Complete full edit flow | Same as above |
| TC-12.3 | Happy path | iPad (768px) | Complete full edit flow | Two-column layout where appropriate, comfortable spacing |
| TC-12.4 | Edge case | Landscape phone | Rotate device during editing | Layout adjusts, no content cut off |
| TC-12.5 | Edge case | Very small screen (320px) | iPhone 5/SE first gen | Content fits, text readable, buttons usable |
| TC-12.6 | Edge case | Touch targets | Tap buttons and links | All interactive elements at least 44x44px |

---

## P1 Features (MMP)

---

### Feature 13: Google Address Validation

**User Story (US-15)**
As a **merchant**, I want Google address validation on edits, so that customers cannot enter invalid addresses that lead to failed deliveries.

**Acceptance Criteria**

| # | Given | When | Then |
|---|-------|------|------|
| AC-13.1 | Google address validation is enabled | The customer enters an address | The address is validated via Google Address Validation API |
| AC-13.2 | The address has a minor issue (missing suite number) | Validation returns a suggestion | The customer sees "Did you mean...?" with the corrected address |
| AC-13.3 | The address is completely invalid | Validation returns UNCONFIRMED | The customer sees an error: "We couldn't verify this address" with option to proceed anyway |
| AC-13.4 | Google API is unavailable | The customer submits an address | The edit proceeds without validation (graceful degradation) |
| AC-13.5 | The merchant is on the Free plan | Address validation is a paid feature | Validation is skipped; address accepted as-is |

**Test Cases**

| ID | Type | Scenario | Steps | Expected Result |
|----|------|----------|-------|-----------------|
| TC-13.1 | Happy path | Valid address | Enter "123 Main St, New York, NY 10001" | Address confirmed, green checkmark shown |
| TC-13.2 | Happy path | Address suggestion | Enter "123 Main St" (missing city) | Suggestion shown: "Did you mean 123 Main St, New York, NY?" |
| TC-13.3 | Happy path | Customer accepts suggestion | Click "Use suggested address" | Suggested address populated in form |
| TC-13.4 | Edge case | Customer rejects suggestion | Click "Use address as entered" | Original address used |
| TC-13.5 | Edge case | International address | Enter address in Japan | Google validates international address correctly |
| TC-13.6 | Error | Google API rate limit | Too many requests | Falls back to no validation, edit proceeds |
| TC-13.7 | Error | Google API key invalid | Misconfigured API key | Falls back silently, no user-facing error |
| TC-13.8 | Edge case | Autocomplete | Start typing address | Autocomplete suggestions appear from Google Places |

---

### Feature 14: Post-Purchase Upsell During Edit Flow

**User Story (US-16)**
As a **merchant**, I want to show product recommendations during edits, so that I can generate additional revenue from the edit interaction.

**Acceptance Criteria**

| # | Given | When | Then |
|---|-------|------|------|
| AC-14.1 | The merchant has configured upsell offers | The customer is on the edit confirmation screen | Relevant product recommendations are shown before the confirm button |
| AC-14.2 | The customer adds an upsell product | They click "Add to order" | The product is included in the edit with updated price diff |
| AC-14.3 | The customer declines all upsells | They click "No thanks" | The edit proceeds normally without upsell products |
| AC-14.4 | No matching upsell offers exist | The customer is editing | No upsell section is shown (clean UX) |
| AC-14.5 | Upsell revenue is tracked | A customer accepts an upsell | The revenue is attributed to the upsell in analytics |

**Test Cases**

| ID | Type | Scenario | Steps | Expected Result |
|----|------|----------|-------|-----------------|
| TC-14.1 | Happy path | Upsell shown during edit | Edit order, reach confirmation step | "You might also like..." section visible with 1-3 products |
| TC-14.2 | Happy path | Customer adds upsell | Click "Add to order" on recommended product | Product added, price diff updated to include upsell |
| TC-14.3 | Happy path | Customer declines | Click "No thanks, save changes" | Edit proceeds without upsell |
| TC-14.4 | Edge case | Upsell product out of stock | Recommended product has 0 inventory | Product not shown in recommendations |
| TC-14.5 | Edge case | Customer already has the recommended product | Upsell product is already in the order | Product not shown (no duplicates) |
| TC-14.6 | Edge case | Multiple upsell offers match | 5 offers match the order | Show top 3 by priority, "See more" link for rest |
| TC-14.7 | Happy path | Revenue attribution | Customer accepts upsell | Analytics event logged with upsell revenue amount |
| TC-14.8 | Edge case | Upsell with discount | Offer includes 10% discount | Discounted price shown, strikethrough on original |

---

### Feature 15: Store Credit Refund Option

**User Story (US-17)**
As a **merchant**, I want to offer store credit instead of cash refunds, so that I retain revenue when customers edit orders down.

**Acceptance Criteria**

| # | Given | When | Then |
|---|-------|------|------|
| AC-15.1 | Store credit is enabled and a refund is due | The customer confirms an edit that results in a lower price | The customer is offered a choice: "Refund to original payment" or "Receive store credit" |
| AC-15.2 | The customer chooses store credit | They select "Store credit" | A gift card / store credit is issued for the refund amount |
| AC-15.3 | The customer chooses original payment refund | They select "Refund to payment method" | A standard refund is processed |
| AC-15.4 | Store credit is disabled | A refund is due | The refund goes directly to original payment method (no choice shown) |

**Test Cases**

| ID | Type | Scenario | Steps | Expected Result |
|----|------|----------|-------|-----------------|
| TC-15.1 | Happy path | Customer chooses store credit | Edit results in -$15 refund, select "Store credit" | Gift card for $15 created, code emailed to customer |
| TC-15.2 | Happy path | Customer chooses refund | Edit results in -$15 refund, select "Refund to card" | $15 refunded to original payment method |
| TC-15.3 | Edge case | Store credit bonus | Merchant offers 10% bonus for store credit | Customer sees "$15 refund OR $16.50 store credit" |
| TC-15.4 | Edge case | Cancellation with store credit | Cancel order, choose store credit | Full order amount issued as store credit |
| TC-15.5 | Edge case | Shopify gift card API fails | API error when creating gift card | Fall back to standard refund, notify merchant |
| TC-15.6 | Edge case | Small refund amount | Refund is $0.50 | Store credit option still offered |

---

### Feature 16: Shopify Flow Integration

**User Story (US-18)**
As a **merchant**, I want Shopify Flow integration, so that I can build custom automation around order edits.

**Acceptance Criteria**

| # | Given | When | Then |
|---|-------|------|------|
| AC-16.1 | The merchant has Shopify Flow installed | An order is edited | An "Order Edited" trigger fires in Shopify Flow with edit details |
| AC-16.2 | The merchant has Shopify Flow installed | An order is cancelled via the app | An "Order Cancelled" trigger fires with cancellation details |
| AC-16.3 | The merchant creates a Flow workflow | They use Avada Order Editing triggers | They can access edit type, price diff, initiator, and reason fields |
| AC-16.4 | A Flow action is configured | A trigger fires | The connected action executes (e.g., tag order, send Slack message) |

**Test Cases**

| ID | Type | Scenario | Steps | Expected Result |
|----|------|----------|-------|-----------------|
| TC-16.1 | Happy path | Edit trigger fires | Customer edits order | "Order Edited" trigger fires with correct payload |
| TC-16.2 | Happy path | Cancel trigger fires | Customer cancels order | "Order Cancelled" trigger fires with reason and refund amount |
| TC-16.3 | Happy path | Flow workflow executes | Create Flow: "When order edited, tag order as 'edited'" | Order is tagged after edit |
| TC-16.4 | Edge case | Flow not installed | Order edited but merchant has no Flow | Trigger sent but silently ignored by Shopify |
| TC-16.5 | Edge case | Multiple triggers in rapid succession | 5 edits in 1 minute | All 5 triggers fire independently |
| TC-16.6 | Error | Flow API unavailable | Shopify Flow endpoint is down | Trigger failure logged, edit still completes |

---

### Feature 17: Analytics Dashboard

**User Story (US-19)**
As a **merchant**, I want an analytics dashboard, so that I can see trends in edits, top edited products, and revenue impact.

**Acceptance Criteria**

| # | Given | When | Then |
|---|-------|------|------|
| AC-17.1 | The merchant opens the Analytics page | Data exists for the selected period | Charts display: total edits, edits by type, top edited products, revenue saved |
| AC-17.2 | The merchant selects a date range | They change from "Last 7 days" to "Last 30 days" | Charts update to reflect the selected period |
| AC-17.3 | No data exists | The merchant opens Analytics on day 1 | Empty state: "No edit data yet. Data will appear after your first customer edit." |
| AC-17.4 | The merchant is on the Free plan | They open Analytics | Basic metrics shown (total edits, total cancellations). Advanced charts gated. |

**Test Cases**

| ID | Type | Scenario | Steps | Expected Result |
|----|------|----------|-------|-----------------|
| TC-17.1 | Happy path | View dashboard | Open Analytics page | Charts load within 2 seconds, data matches edit records |
| TC-17.2 | Happy path | Change date range | Select "Last 30 days" | All charts update to 30-day data |
| TC-17.3 | Happy path | Top edited products | View "Top Edited Products" chart | Products sorted by edit frequency, showing count and percentage |
| TC-17.4 | Happy path | Revenue saved metric | View revenue section | Shows "Estimated support cost saved" based on edit count x avg cost |
| TC-17.5 | Edge case | Empty state | New install, no data | Empty state message shown, no errors |
| TC-17.6 | Edge case | Large dataset | Store with 10,000+ edits | Dashboard loads within 3 seconds (BigQuery optimized) |
| TC-17.7 | Edge case | Export data | Click "Export CSV" | CSV downloads with all edit records for selected period |

---

### Feature 18: Cancellation Retention Flow

**User Story (US-20)**
As a **customer**, I want to see a retention offer when I try to cancel, so that I might keep my order with a better deal.

**Acceptance Criteria**

| # | Given | When | Then |
|---|-------|------|------|
| AC-18.1 | Retention flow is enabled and the customer clicks "Cancel Order" | The cancellation screen loads | A reason picker is shown before the cancel button |
| AC-18.2 | The customer selects a reason | They choose "Found it cheaper elsewhere" | Targeted retention offers appear (e.g., "Get 15% off this order") |
| AC-18.3 | The customer accepts a retention offer | They click "Apply 15% discount" | The discount is applied to the order, cancellation is prevented |
| AC-18.4 | The customer rejects all offers | They click "No thanks, cancel order" | The order is cancelled normally |
| AC-18.5 | Retention flow is disabled | The customer clicks "Cancel Order" | Standard cancellation flow (reason + confirm) without offers |

**Test Cases**

| ID | Type | Scenario | Steps | Expected Result |
|----|------|----------|-------|-----------------|
| TC-18.1 | Happy path | Retention with discount | Select "Found cheaper", accept 15% off | Discount applied, order retained, analytics logged |
| TC-18.2 | Happy path | Retention with swap | Select "Wrong item", accept product swap | Swap processed, order retained |
| TC-18.3 | Happy path | Customer rejects retention | Decline all offers, confirm cancel | Order cancelled normally |
| TC-18.4 | Edge case | Retention offer expired | Discount code has expired | Offer not shown, or fallback offer presented |
| TC-18.5 | Edge case | Customer retained then cancels again | Accept offer, then try to cancel again | Second cancellation shows offers again or proceeds directly |
| TC-18.6 | Edge case | Retention analytics | View retention metrics in dashboard | Shows retention rate, revenue saved, popular offers |

---

### Feature 19: Multi-Language Support

**User Story (US-21)**
As a **merchant**, I want multi-language support, so that my international customers can self-edit in their language.

**Acceptance Criteria**

| # | Given | When | Then |
|---|-------|------|------|
| AC-19.1 | The store has multiple languages configured | A customer visits in French | All widget text, buttons, and messages display in French |
| AC-19.2 | A language is not supported | A customer visits in an unsupported language | The widget falls back to English |
| AC-19.3 | The merchant customizes translations | They edit French translations in settings | Custom translations override defaults |

**Test Cases**

| ID | Type | Scenario | Steps | Expected Result |
|----|------|----------|-------|-----------------|
| TC-19.1 | Happy path | French customer | Visit order status page in French locale | Widget shows "Modifier la commande", "Annuler la commande" |
| TC-19.2 | Happy path | German customer | Visit in German locale | Widget shows "Bestellung bearbeiten" |
| TC-19.3 | Edge case | RTL language (Arabic) | Visit in Arabic locale | Widget renders RTL, text alignment correct |
| TC-19.4 | Edge case | Language not supported | Visit in Thai | Falls back to English |
| TC-19.5 | Edge case | Long translated strings | German translations are 40% longer | Layout does not break, text wraps correctly |
| TC-19.6 | Happy path | Custom translations | Merchant overrides French "Cancel" text | Custom text appears instead of default |

---

## Cross-Cutting Test Cases

---

### Performance

| ID | Scenario | Target | Test Method |
|----|----------|--------|-------------|
| PERF-01 | Edit page initial load (cold start) | < 2 seconds | Lighthouse performance audit |
| PERF-02 | Edit page initial load (warm) | < 1 second | Browser DevTools Network tab |
| PERF-03 | API response: GET /edit-eligibility | < 300ms (p95) | Load testing with k6/Artillery |
| PERF-04 | API response: POST /edits/confirm | < 500ms (p95) | Load testing |
| PERF-05 | Webhook handler response to Shopify | < 2 seconds (p95) | Cloud Monitoring |
| PERF-06 | Admin dashboard page load | < 2 seconds | Lighthouse |
| PERF-07 | Analytics dashboard with 30 days of data | < 3 seconds | Manual + BigQuery query time |
| PERF-08 | 10 concurrent edits on same store | All succeed, no race conditions | Concurrent load test |
| PERF-09 | Widget render on Order Status Page | < 500ms | Web Vitals (LCP) |
| PERF-10 | Background job (edit processing) | < 10 seconds end-to-end | Cloud Monitoring |

### Security

| ID | Scenario | Expected Result | Test Method |
|----|----------|-----------------|-------------|
| SEC-01 | Webhook without valid HMAC header | 401 Unauthorized | Send forged webhook |
| SEC-02 | API call without session token | 401 Unauthorized | Call API with no auth header |
| SEC-03 | Customer tries to edit another customer's order (IDOR) | 403 Forbidden | Modify orderId in request to another customer's order |
| SEC-04 | Shop A tries to access Shop B's data | Empty result / 403 | Call API with Shop A's token but Shop B's shopId |
| SEC-05 | SQL injection in search fields | No injection, input sanitized | Enter SQL payloads in search/filter fields |
| SEC-06 | XSS in address fields | HTML escaped, no script execution | Enter `<script>alert(1)</script>` in address |
| SEC-07 | Rate limiting on edit endpoints | 429 after threshold | Send 100 requests in 10 seconds |
| SEC-08 | Access token stored encrypted | Token not readable in Firestore | Inspect Firestore document directly |
| SEC-09 | CSRF protection on mutation endpoints | Request rejected without CSRF token | Send POST without origin/CSRF validation |
| SEC-10 | Expired session token | 401, re-auth required | Use token after TTL expiry |

### Mobile Responsiveness

| ID | Scenario | Devices | Expected Result |
|----|----------|---------|-----------------|
| MOB-01 | Order status page widget | iPhone SE, iPhone 14, Pixel 7, Samsung Galaxy S23 | Widget renders correctly, buttons tappable |
| MOB-02 | Edit order page | Same devices | Form usable, dropdowns work, keyboard doesn't obscure inputs |
| MOB-03 | Edit confirmation modal | Same devices | Modal is scrollable, buttons visible without scrolling |
| MOB-04 | Admin dashboard (merchant mobile) | iPad, iPhone 14 Pro Max | Dashboard usable but desktop recommended for full experience |
| MOB-05 | Touch target sizes | All mobile devices | All interactive elements >= 44x44px |

### Rate Limiting

| ID | Scenario | Threshold | Expected Result |
|----|----------|-----------|-----------------|
| RATE-01 | Customer edit submissions | 10 per minute per order | 429 after 10th request with retry-after header |
| RATE-02 | API calls per store | 100 per minute | 429 with message "Rate limit exceeded" |
| RATE-03 | Webhook processing per store | 50 per minute | Queue overflow handled via Pub/Sub backpressure |
| RATE-04 | Admin API calls | 200 per minute per merchant | 429 with retry-after |

### Data Integrity

| ID | Scenario | Expected Result |
|----|----------|-----------------|
| DATA-01 | Concurrent edits on same order | Optimistic locking prevents lost updates |
| DATA-02 | Edit fails midway through Shopify mutations | Atomic rollback, no partial state |
| DATA-03 | Firestore write fails after Shopify commit | Background retry ensures data consistency |
| DATA-04 | Usage counter accuracy | Monthly edit count matches actual edit records |
| DATA-05 | Edit history completeness | Every committed edit has a corresponding orderEdit record |

---

*End of User Stories & Test Cases*
