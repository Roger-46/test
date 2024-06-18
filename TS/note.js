https://kb.avada.net/
Please go to your Magento backend > Stores > Configuration > Extension > Mageplaza > SMTP to check the extension version.

			chạy local

// php -s localhost 8080
                  
                  app SEO
            case được tăng speed.

https://drive.google.com/drive/u/0/folders/1T0n6qhScT6xSOgjvWAsg0dKUSdBaDHkB
							   app Joy
		  	Luồng chạy				
// ban đầu khi mới cài app Joy, mình sẽ sync tất cả customer và guest ở shopify sang, đều có point = 0. Mục đích là để admin cài rồi setup earning program xong, nó sẽ áp dụng cho các customer. Chứ để áp dụng ngay khi cài app thì admin chưa kịp setup reward mình đã add point theo default reward cho customer r, sau k thể đổi dc
// v nên customer cũ có từ trước khi cài app sẽ có point = 0, khi nào họ login, hay có thao tác update customer bất kì từ admin, thì sẽ dc update point theo reward của mình
// nếu khách nào muốn update tất cả customer thì mình sẽ vào /dev_zone ấn sync, thì nó sẽ update cho các customer cũ, còn customer mới thì tự động dc apply chứ, k thì sẽ là lỗi ở app
// như ảnh ở trên thì customer kia có 300 point rồi, thế vấn đề họ hỏi là gì?
// giờ k phải sửa bằng cách tự add customer cho khách, vì mình add nó chỉ là guest chứ k thành customer dc. Mình k thể tự tạo tk với email đó và viết pass vào, làm sao họ login dc							
					     		app EM
            ảnh vi phạm chính sách ở console ở store m2
    // báo dev của whitelist domain bên thứ 3
    // https://meetanshi.com/blog/fixed-content-security-policy-warnings-in-magento-2/        
		      	lỗi send SMS
// bây h làm theo các bước:
// Em thử send test = sđt e
// Bảo họ thử dùng sender riêng, nếu ko send MMS thì dùng số tollfree sẽ tốt hơn sender chung như hiện tại
// E email cho Twilio (họ hay rep tầm 8-9h tối giờ VN), hỏi lí do vì sao MID này ko deliveried: SM897e86a75aec404a95d57dc3fe82b097
//  đây là các bước xử lí chung cho các case khách báo send fail, chưa deliveiered, send SMS mà k nhận đc .v.v.v e note lại nhé (edited) 
          	chèn html email

https://www.mail-signatures.com/signature-generator/#/user-graphics (edited) 
				    remove EM
  // {% assign scripttags = content_for_header | split: 'var urls = ["' %}
  // {% if scripttags.size > 1 %}
  //   {% assign scripttags = scripttags[1] %}
  //   {% assign scripttags = scripttags | split: '"];' %}
  //   {% if scripttags.size > 1 %}
  //     {% assign scripttags = scripttags[0] %}
  //     {% assign scripttags = scripttags | split: '","' %}
  //     {% assign avada_fsb_scriptag = "" %}
  //     {% for url in scripttags %}
  //       {% if url contains "avada-sdk.min.js"%}
  //         {% assign avada_fsb_scriptag = url %}
  //       {% endif %}
  //     {% endfor %}
  //     {% if avada_fsb_scriptag != "" %}
  //       {% assign content_for_header = content_for_header | remove: avada_fsb_scriptag %}
  //     {% endif %}
  //   {% endif %}
  // {% endif %}

            get HTML email
            
  // function getContent() {
  //   return `
  //     <!DOCTYPE html>
  //     <html lang="en">
  //     <head>
  //       <meta charset="utf-8"/> <!-- utf-8 works for most cases -->
  //       <meta name="viewport" content="width=device-width"/> <!-- Forcing initial-scale shouldn't be necessary -->
  //       <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <!-- Use the latest (edge) version of IE rendering engine -->
  //       <meta name="x-apple-disable-message-reformatting"/><!-- Disable auto-scale in iOS 10 Mail entirely --><title></title>
  //       <!-- The title tag shows in email notifications, like Android 4.4. -->
  //       <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet"/>
  //       <!-- CSS Reset : BEGIN --><!-- CSS Reset : END --><!-- Progressive Enhancements : BEGIN -->
  //       <title>Document</title>
  //       <style>
  //                /* width */
  //           ::-webkit-scrollbar {
  //             width: 0px;
  //             height: 0px;
  //           }

  //           /* Track */
  //           ::-webkit-scrollbar-track {
  //             background: #f1f1f1;
  //           }

  //           /* Handle */
  //          ::-webkit-scrollbar-thumb {
  //             background: #c3c3c3;
  //             border-radius: 10px;
  //           }

  //           /* Handle on hover */
  //           ::-webkit-scrollbar-thumb:hover {
  //             background: #c3c3c3;
  //           }
  //       </style>
  //       <style>
  //         ${editor.getCss()}
  //       </style>
  //     </head>
  //     <body>
  //       ${editor.getHtml()}
  //     </body>
  //     </html>
  //   `;
  // }
             shop m2 Browse product ko show sản phẩm.
// https://avada-em-doc.web.app/docs/App%20-%20Marketing%20Automation/FAQs/m2-cannot-browse-product/
// https://devdocs.magento.com/guides/v2.4/graphql/
// https://kb.avada.net/docs/magento-customers-cannot-browse-products/

          verify app
// https://help.avada.io/en/article/add-your-own-domain-verify-domain-1axltrw/

		    	track không hoạt động.
// add code vào file product.liquid			

// <script type="text/javascript">
//   window.AVADA_EM = window.AVADA_EM || {};

//   window.AVADA_EM.product = {
//     id: {{ product.id|json }},
//     title: {{ product.title|json }},
//     vendor: {{ product.vendor|json }},
//     productType: {{ product.type|json }},
//     collections: {{ product.collections|map:'title'|json }},
//     image: "https:{{ product.featured_image.src|img_url:'grande' }}",
//     url: "{{ shop.secure_url }}{{ product.url }}",
//     price: {{ product.price |json }},
//     tags: {{ product.tags |json }},
//   };
// </script>	

		    	chỉnh css cho block trong auto
// 			function updateRule({selector, styleData, reset = false}) {
// 	if (reset) {
// 		return editor.Css.setRule(selector, {})	
// 	}

// 	const rule = editor.Css.getRule(selector)
// 	editor.Css.setRule(selector, {...rule.attributes.style, ...styleData})	
// }
// updateRule({selector, styleData, reset = false})
// updateRule({selector: '.line-subtitle', styleData: {'display': 'none'}})


 // editor.CssComposer.setRule(
 //          '.table-640 tr img',
 //           {"padding-top": "39px !important"},
 //           { atRuleType: 'media',
 //            atRuleParams: 'only screen and (min-width: 600px)'}
 //        );


          
	 	     	trigger customize
// create trigger/customize trong auto
// test trên postman 
	// 	envent-id
	// 	X-EmailMarketing-App-Id
	// 	X-EmailMarketing-Hmac-Sha256 (https://www.devglan.com/online-tools/hmac-sha256-online) JSON.stringify({"data":{"email": "haidx@mageplaza.com"}})
	// 	X-AvadaTrigger-App-Id  (true)

// add fetch vào backend.
//https://app.avada.io/app/api/v1/triggers/llVS3U8WK5EBYTOddU5x


  // const email = ''
  // const send = XMLHttpRequest.prototype.send;
  //       XMLHttpRequest.prototype.send = function() {
  //         const self = this;
  //         if (self._url?.includes('/trackifyx.redretarget.com/log')) 
  //         	{
              
  //     		 	const email = document.querySelector('input[name="contact[email]"]').value;	
  //             	console.log(email)
              
		// 		localStorage.setItem("email", email);
  //             const storedEmail =  localStorage.getItem("email");
              
  //     		 if(storedEmail !== '') {
  //                 console.log(email)
  //     	          async function postData(url = 'https://app.avada.io/app/api/v1/triggers/8ogQvJwLOSUern6m7kzq', data = '{"email": {email},{"source":"true"}}'){
  //     	          console.log(data)
  //     	          const response = await fetch('https://app.avada.io/app/api/v1/triggers/8ogQvJwLOSUern6m7kzq', {
  //     	            method: 'POST', 
  //     	            mode: 'cors', 
  //     	            cache: 'no-cache', 
  //     	            credentials: 'same-origin',
  //     	            headers: {
  //     	              'Content-Type': 'application/json',
  //     	              'X-EmailMarketing-App-Id': 'vRUdFCYOdgrHrkujxEIV',
  //     	              'X-EmailMarketing-Hmac-Sha256': 'mZxW6yZiw4WIbLCewiNo68nNK5HLCwkbV+3xkCWnjYE=',
  //     	              'X-AvadaTrigger-App-Id': 'true'
  //     	            },
  //     	            redirect: 'follow', 
  //     	            referrerPolicy: 'no-referrer', 
  //     	            body: JSON.stringify(data) 
  //     	          });
  //     	          return response.json(); 
  //     	         };
  //     		}

  //       postData('https://app.avada.io/app/api/v1/triggers/8ogQvJwLOSUern6m7kzq', { answer: 42 })
  //         .then(data => {
  //           console.log(data); 
  //         });

              
  //             if(storedEmail !==""){
                
  //               return handleCallback(id, callback, true, (afterClose = () => {}) => {
  //                 self.onreadystatechange = function() {
  //                   if (self.readyState == XMLHttpRequest.DONE) {
  //                     if (self.status == 200) {
  //                       afterClose();
  //                     }
  //                   }
  //                 return send.apply(self, arguments);
  //                 };
  //               });
            
  //             }
  //           }
  //         return send.apply(self, arguments);
  //       };

              preview mobile bị lỗi
//   editor.getWrapper().find(`[width='600']`)[0].addClass('table-640')
// editor.setStyle(editor.getCss() + '@media only screen and (max-width: 699px){table.table-640, div.row{width: 100% !important;max-width: 100% !important}}')
              
 							app proofo
 							
 			hiển thị star rating ở collection page.
//  <!-- Avada Photo Review Script -->
// <script>
// const AVADA_PR_PRODUCT_COLLECTION = {{collection.products | json}};
// </script>
// <!-- /Avada Photo Review Script -->
	
			hiện star rating ở gg.
// add vào avada-product-review-structured.liquid		
 // {%- if ratingCount > 0 %}
 //  "aggregateRating": {
 //    "@type": "X-AvadaTrigger-App-IdregateRating",
 //    "ratingValue": {{ratingStructured.ratingValue}},
 //    "bestRating": "5",
 //    "ratingCount": {{ratingStructured.ratingCount}}
 //  },
 //  {%- endif -%}

// check Added by AVADA Photo Reviews ở prodcut page.
// https://search.google.com/test/rich-results


td = editor.getWrapper().find('#i5zbmt')[0]
td.setStyle({...td.getStyle(), 'display': 'none'})


@media screen and (max-width: 600px){
.wrapper-inner table.table-640{
  width: 600px !important;
max-width: 600px !important;
}
.row.product-grid-col{
   display: inline-block !important;
  width: 100% !important;
max-width: 180px !important;
}
#ipd9mo{
  display: none !important
}
#iakrok{
  display: none !important
}


#isxueb .line-item-row div.row:nth-child(3){
        width: 190px !important;
  }
#ip0weg .line-item-row div.row:nth-child(1){
        width: 80px !important;
  }
#ig4m7l .line-item-row div.row:nth-child(5){    
        width: 80px !important;
  }
}
editor.getWrapper().find('#i5zbmt > tbody > tr:nth-child(15)').forEach(model => {
    model.addClass('background-coupon')
})


td = editor.getWrapper().find('#icit1n')[0]
td.setStyle({...td.getStyle(), 'background':  "#f4f4f4 !important;"})