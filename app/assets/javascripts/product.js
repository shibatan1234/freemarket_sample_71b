$(document).on('turbolinks:load', function(){
//   // 画像が選択された時プレビュー表示、inputの親要素のdivをイベント元に指定
  $('#image-input').on('change', function(e){
    
    //ファイルオブジェクトを取得する
    let files = e.target.files;
    $.each(files, function(index, file) {
      let reader = new FileReader();
      //画像でない場合は処理終了
      if(file.type.indexOf("image") < 0){
        alert("画像ファイルを指定してください。");
        return false;
      }
      //アップロードした画像を設定する
      reader.onload = (function(file){
        return function(e){
          let imageLength = $('#output-box').children('li').length;
          let imageLengthUnder = $('#output-box-under').children('li').length;
          // 表示されているプレビューの数を数える

          let labelLength = $("#image-input>label").eq(-1).data('label-id');
          console.log(labelLength);
          // #image-inputの子要素labelの中から最後の要素のカスタムデータidを取得

          // プレビュー表示
          if (imageLength < 5) {
          $('.upper-anchor').before(`<li class="preview-image" id="upload-image${labelLength}" data-image-id="${labelLength}">
                                      <div class="preview-image__figure">
                                        <img src='${e.target.result}' title='${file.name}' id='exhibit-image'>
                                      </figure>
                                      <div class="preview-image__button" style="text-align: center;margin-left: 8px;">
                                        <a class="preview-image__button__delete" data-image-id="${labelLength}">削除</a>
                                      </div>
                                    </li>`);
          $("#image-input>label").eq(-1).css('display','none');
          // 入力されたlabelを見えなくする
          // if (imageLength + imageLengthUnder == 10){
          //   $("#image-input>label").eq(-1).css('display','none');
          // }
          } else if (imageLengthUnder < 5 ) {
            // $(".category-group__image-contents").css('height','35vh');
            $('.lower-anchor').before(`<li class="preview-image" id="upload-image${labelLength}" data-image-id="${labelLength}">
                                        <div class="preview-image__figure">
                                          <img src='${e.target.result}' title='${file.name}' id='exhibit-image'>
                                        </figure>
                                        <div class="preview-image__button" style="text-align: center;margin-left: 8px;">
                                          <a class="preview-image__button__delete" data-image-id="${labelLength}">削除</a>
                                        </div>
                                      </li>`);
            $("#image-input>label").eq(-1).css('display','none');
            // 入力されたlabelを見えなくする
          };

           imageLength = $('#output-box').children('li').length;
           imageLengthUnder = $('#output-box-under').children('li').length;
          // 追加された写真を含めた枚数を数える
          if (imageLength < 5 || imageLengthUnder < 5 || imageLength + imageLengthUnder == 9) {

            // 表示されているプレビューが９以下なら、新たにinputを生成する
            $("#image-input").append(`<label for="item_images${labelLength+1}" class="sell-container__content__upload__items__box__label" data-label-id="${labelLength+1}">
                                        <input type="file" class="sell-container__content__upload__items__box__input" id="item_images${labelLength+1}" style="display: none;" name="product[images_attributes][${labelLength+1}][image]">
                                        <i class="fas fa-camera fa-lg"></i>
                                      </label>`);
          } else {
          }
        };
      })(file);
      reader.readAsDataURL(file);
    });
  });

  //削除ボタンが押された時
  $(document).on('click', '.preview-image__button__delete', function(){
    let targetImageId = $(this).data('image-id');
    // イベント元のカスタムデータ属性の値を取得
    $(`#upload-image${targetImageId}`).remove();
    //プレビューを削除
    $(`[for=item_images${targetImageId}]`).remove();
    // 該当indexを振られているチェックボックスを取得する
    const hiddenCheck = $(`#product_images_attributes_${targetImageId}__destroy`);
    // もしチェックボックスが存在すればチェックを入れる
    if (hiddenCheck) hiddenCheck.prop('checked', true);

    let imageLength = $('#output-box').children('li').length;
    let imageLengthUnder = $('#output-box-under').children('li').length;
    // 表示されているプレビューの数を数える

    // if ($('[for=item_images10]').is(':hidden')) {
      if (imageLength + imageLengthUnder == 9) {
        // 表示されているプレビューが９なら,#image-inputの子要素labelの中から最後の要素のカスタムデータidを取得
        let labelLength = $("#image-input>label").eq(-1).data('label-id');
        // 表示されているプレビューが９なら,#image-inputの子要素js-file_groupの中から最後の要素のカスタムデータidを取得
        let labelLength_edit = $("#image-input>.js-file_group").eq(-1).data('index');

        if (labelLength_edit==9){
          $("#image-input").append(`
        <label for="item_images${labelLength_edit+1}" class="sell-container__content__upload__items__box__label" data-label-id="${labelLength_edit+1}">
          <input multiple="multiple" class="sell-container__content__upload__items__box__input" id="item_images${labelLength_edit+1}" style="display: none;" type="file" name="product[images_attributes][${labelLength+1}][image]">
          <i class="fas fa-camera fa-lg"></i>
        </label>`);
        }else {
          $("#image-input").append(`
        <label for="item_images${labelLength+1}" class="sell-container__content__upload__items__box__label" data-label-id="${labelLength+1}">
          <input multiple="multiple" class="sell-container__content__upload__items__box__input" id="item_images${labelLength+1}" style="display: none;" type="file" name="product[images_attributes][${labelLength+1}][image]">
          <i class="fas fa-camera fa-lg"></i>
        </label>`);
        }



 
      };
    // }
  });

  // f.text_areaの文字数カウント
  $("textarea").keyup(function(){
    let txtcount = $(this).val().length;
    $("#word-count").text(txtcount+  " \/1000");
  });

  // //販売価格入力時の手数料計算
  // $('#price-contents').keyup(function(){
  //   let price= $(this).val();
  //   if (price >= 300 && price <= 9999999){
  //     let fee = Math.floor(price * 0.1);
  //     // 小数点以下切り捨て
  //     let profit = (price - fee);
  //     $('.sell-container__content__commission__right').text('¥'+fee.toLocaleString());
  //     // 対象要素の文字列書き換える
  //     $('.sell-container__content__profit__right').text('¥'+profit.toLocaleString());
  //   } else{
  //     $('.sell-container__content__commission__right').html('ー');
  //     $('.sell-container__content__profit__right').html('ー');
  //   }
  // });


//   // 各フォームの入力チェック
//   $(function(){
//     //画像
//     $('#image-input').on('focus',function(){
//       $('#error-image').text('');
//       $('#image-input').on('blur',function(){
//         $('#error-image').text('');
//         let imageLength = $('#output-box').children('li').length;
//         if(imageLength ==''){
//           $('#error-image').text('画像がありません');
//         }else if(imageLength >10){
//           $('#error-image').text('画像を10枚以下にして下さい');
//         }else{
//           $('#error-image').text('');
//         }
//       });
//     });

//     //送信しようとした時
//     $('form').on('submit',function(){
//       let imageLength = $('#output-box').children('li').length;
//       if(imageLength ==''){
//         $('body, html').animate({ scrollTop: 0 }, 500);
//         $('#error-image').text('画像がありません');
//       }else if(imageLength >10){
//         $('body, html').animate({ scrollTop: 0 }, 500);
//         $('#error-image').text('画像を10枚以下にして下さい');
//       }else{
//         return true;
//       }
//     });

//      //画像を削除した時
//     $(document).on('click','.preview-image__button__delete',function(){
//       let imageLength = $('#output-box').children('li').length;
//       if(imageLength ==''){
//         $('#error-image').text('画像がありません');
//       }else if(imageLength >10){
//         $('#error-image').text('画像を10枚以下にして下さい');
//       }else{
//         $('#error-image').text('');
//       }
//     });

    //商品名
    $('.small-contents').on('blur',function(){
      let value = $(this).val();
      if(value == ""){
        $('#error-name').text('入力してください');
        $(this).css('border-color','red');
      }else{
        $('#error-name').text('');
        $(this).css('border-color','rgb(204, 204, 204)');
      }
    });

    //商品説明
    $('.middle-contents').on('blur',function(){
      let value = $(this).val();
      if(value == ""){
        $('#error-description').text('入力してください');
        $(this).css('border-color','red');
      }else{
        $('#error-description').text('');
        $(this).css('border-color','rgb(204, 204, 204)');
      }
    });

    //カテゴリーのエラーハンドリング
    function categoryError(categorySelect){
      let value = $(categorySelect).val();
      if(value == "---"){
        $('#error-category').text('選択して下さい');
        $(categorySelect).css('border-color','red');
      }else{
        $('#error-category').text('');
        $(categorySelect).css('border-color','rgb(204, 204, 204)');
      }
    };
    //親カテゴリー
    $('#parent-category').on('blur',function(){
      categoryError('#parent-category')
    });
    //子カテゴリー
    $('.category-group__small-contents').on('blur', '#child-category', function(){
      categoryError('#child-category')
    });
    //孫カテゴリー
    $('.category-group__small-contents').on('blur', '#grandchild-category', function(){
      categoryError('#grandchild-category')
    });

    //状態
    $('#product_status_id').on('blur',function(){
      let value = $(this).val();
      if(value == ""){
        $('#error-status').text('選択して下さい');
        $(this).css('border-color','red');
      }else{
        $('#error-status').text('');
        $(this).css('border-color','rgb(204, 204, 204)');
      }
    });

    //送料負担
    $('#product_burden_id').on('blur',function(){
      let value = $(this).val();
      if(value == ""){
        $('#error-burden').text('選択して下さい');
        $(this).css('border-color','red');
      }else{
        $('#error-burden').text('');
        $(this).css('border-color','rgb(204, 204, 204)');
      }
    });

    //発送方法
    function deliverywayError(deliverywaySelect){
      let value = $(deliverywaySelect).val();
      if(value == ""){
        $('#error-way').text('選択して下さい');
        $(deliverywaySelect).css('border-color','red');
      }else{
        $('#error-way').text('');
        $(deliverywaySelect).css('border-color','rgb(204, 204, 204)');
      }
    };
    $('.delivery-burden').on('blur', '#delivery-way_id', function(){
      deliverywayError('#delivery-way_id')
    });

    //発送元
    $('#product_prefecture_id').on('blur',function(){
      let value = $(this).val();
      if(value == ""){
        $('#error-prefecture').text('選択して下さい');
        $(this).css('border-color','red');
      }else{
        $('#error-prefecture').text('');
        $(this).css('border-color','rgb(204, 204, 204)');
      }
    });

    //発送までの日数
    $('#product_days_id').on('blur',function(){
      let value = $(this).val();
      if(value == ""){
        $('#error-days').text('選択して下さい');
        $(this).css('border-color','red');
      }else{
        $('#error-days').text('');
        $(this).css('border-color','rgb(204, 204, 204)');
      }
    });

    //価格
    $('.price-contents').on('blur',function(){
      let value = $(this).val();
      if(value < 50 || value > 9999999){
        $('#error-price').text('51以上9999999以下で入力してください');
        $(this).css('border-color','red');
      }else{
        $('#error-price').text('');
        $(this).css('border-color','rgb(204, 204, 204)');
      }
    });
//   });  
});








//   $(function(){
//     // カテゴリーセレクトボックスのオプションを作成
//     function categoryOption(category){
//       var optionHtml = `<option value="${category.id}">${category.name}</option>`;
//       return optionHtml;
//     }
//     // 親カテゴリー選択後のイベント
//     $('#category-select-parent').on('change', function(){
//       let parentCategoryId = $(this).val();
//       //選択された親カテゴリーのIDを取得
//       if (parentCategoryId == ''){
//         //親カテゴリーが空（初期値）の時
//         $('#select-children-box').remove();
//         $('#select-grandchildren-box').remove();
//         //子と孫を削除するする
//       }else{
//         $.ajax({
//           url: '/items/category_children',
//           type: 'GET',
//           data: { parent_id: parentCategoryId },
//           dataType: 'json'
//         })
//         .done(function(category_children){
//           $('#select-children-box').remove();
//           $('#select-grandchildren-box').remove();
//           //親が変更された時、子と孫を削除するする
//           let optionHtml = '';
//           category_children.forEach(function(child){
//             optionHtml += categoryOption(child);
//             //option要素を作成する
//           });
//           $('#error-category').before(`<div class="sell-collection_select " id="select-children-box">
//                                           <label class="sell-collection_select__label" for="item_category_id">
//                                             <select class="sell-collection_select__input" id="category-select-children" required="required" name="item[category_id]">
//                                               <option value="">選択して下さい</option>
//                                               ${optionHtml}
//                                             </select>
//                                             <i class="fas fa-chevron-down"></i>
//                                           </label>
//                                         </div>`
//           );
//         })
//         .fail(function(){
//           alert('カテゴリー取得に失敗しました');
//         });
//       }
//     });
//     // 子カテゴリー選択後のイベント
//     $('.sell-container__content__details').on('change', '#category-select-children', function(){
//       let childrenCategoryId = $(this).val();
//       //選択された子カテゴリーのIDを取得
//       if (childrenCategoryId == ''){
//         //子カテゴリーが空（初期値）の時
//         $('#select-grandchildren-box').remove(); 
//         //孫以下を削除する
//       }else{
//         $.ajax({
//           url: '/items/category_grandchildren',
//           type: 'GET',
//           data: { child_id: childrenCategoryId },
//           dataType: 'json'
//         })
//         .done(function(category_grandchildren){
//           $('#select-grandchildren-box').remove();
//           //子が変更された時、孫を削除するする
//           let optionHtml = '';
//           category_grandchildren.forEach(function(grandchildren){
//             optionHtml += categoryOption(grandchildren);
//             //option要素を作成する
//           });
//           $('#error-category').before(`<div class="sell-collection_select " id="select-grandchildren-box">
//                                           <label class="sell-collection_select__label" for="item_category_id">
//                                             <select class="sell-collection_select__input" id="category-select-grandchildren" required="required" name="item[category_id]">
//                                               <option value="">選択して下さい</option>
//                                               ${optionHtml}
//                                             </select>
//                                             <i class="fas fa-chevron-down"></i>
//                                           </label>
//                                         </div>`
//           );
//         })
//         .fail(function(){
//           alert('カテゴリー取得に失敗しました');
//         });
//       }
//     });
//   });
