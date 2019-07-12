$(`button[data-edit-id=${key}]`).click(function(event) {
    event.preventDefault();

    $(`.post-style[data-text-id="${key}"]`).replaceWith(`<textarea data-id-txta=${key} class="post-area border-0">${text}</textarea>`);
    $(`.btn-save[data-save-id="${key}"]`).toggleClass("d-none");

    $(`.btn-save[data-save-id="${key}"]`).click(function (event) {
      event.preventDefault();
      let newText = $(`[data-id-txta=${key}]`).val()
      database.ref('post/' + key).update({ text: newText })
    })

    $(`[data-id-txta=${key}]`).replaceWith(`<span data-text-id="${key}" class="post-style">${newText}</span>`)

    $(`.btn-save[data-save-id="${key}"]`).toggleClass("d-none");
    });
  };