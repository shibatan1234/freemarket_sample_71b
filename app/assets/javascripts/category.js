$(function(){
  // カテゴリーセレクトボックスのオプションを作成
  function appendOption(category){
    var html = `<option value="${category.id}" data-category="${category.id}">${category.name}</option>`;
    return html;
  }
  // 子カテゴリーの表示作成
  function appendChidrenBox(insertHTML){
    var childSelectHtml = '';
    childSelectHtml = ` <select class="small-contents" id="child-category" name="category_id">
                          <option value="---" data-category="---">---</option>
                          ${insertHTML}
                        <select>`;
    $('.parent-box').append(childSelectHtml);
  }
  // 孫カテゴリーの表示作成
  function appendGrandchidrenBox(insertHTML){
    var grandchildSelectHtml = '';
    grandchildSelectHtml = `<select class="small-contents" id="grandchild-category" name="category_id">
                              <option value="---" data-category="---">---</option>
                              ${insertHTML}
                            </select>`;
    $('.parent-box').append(grandchildSelectHtml);
  }
  $('.category-group').on('change', '#parent-category', function(){
    console.log("ok")
    var parentCategory = document.getElementById('parent-category').value; 
    
    if (parentCategory != "---"){ 
      $.ajax({
        type: 'GET',
        url: '/products/get_category_children',
        data: { parent_name: parentCategory },
        dataType: 'json'
      })
      .done(function(children){
        $('#child-category').remove(); 
        $('#grandchild-category').remove();
        var insertHTML = '';
        children.forEach(function(child){
            insertHTML += appendOption(child);
          });
          appendChidrenBox(insertHTML);
      })
      .fail(function(){
          alert('カテゴリー取得に失敗しました');
        });
    }else{
      $('#child-category').remove(); 
      $('#grandchild-category').remove();
    }
  });
  
  $(document).on('change', '#child-category', function(){
      $('#child-category').off('change');
      var childId = $('#child-category option:selected').data('category'); 
      if (childId != "---"){ 
        $.ajax({
          type: 'GET',
          url: '/products/get_category_grandchildren',
          data: { child_id: childId },
          dataType: 'json'
        })
        .done(function(grandchildren){
        if (grandchildren.length != 0) {
            $('#grandchildren_wrapper').remove();
            $('#grandchild-category').remove();
        var insertHTML = '';
        grandchildren.forEach(function(grandchild){
          insertHTML += appendOption(grandchild);
        });
          appendGrandchidrenBox(insertHTML);
        }
      })
      .fail(function(){
        alert('カテゴリー取得に失敗しました');
      })
    }else{
      $('#grandchild-category').remove();
    }
  });
});