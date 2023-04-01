addBtn.addEventListener("click", e => {
    mdBox.style.display = "flex";
});
mdClose.addEventListener("click", e => {
    mdBox.style = null;
});

/*
    По умолчанию форма отправляется на сервер get-запросом по адресу атрибута action (если он отсутсвует или пустой - страница перезагрузится)
*/
addForm.addEventListener("submit", e => {
    e.preventDefault(); // остановить действие по умолчанию
    const body = {};
    console.log(addForm.children) // дочерние теги (прямые потомки)
    console.log(addForm.elements) // все элементы формы (input/select/textarea/button)

    for (let i = 0; i < addForm.elements.length; i++) {
        const inp = addForm.elements[i];
        console.log(inp);
        // на сервер отправляются name=value
        console.log(inp.name);
        console.log(inp.value);
        if (inp.name) { // элемент формы имеет атрибут name (не является кнопкой)
            if (inp.type === "checkbox") {
                body[inp.name] = inp.checked;
            } else {
                // body[inp.name] = !isNaN(inp.value) ? +inp.value : inp.value;
                body[inp.name] = inp.value;
            }
        }
    }
    console.log(body);
    fetch(path + "/add", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    .then(res => {
        if (res.ok) {
            addForm.reset();
            mdBox.style = null;
            createCard(body);
        } else {
            return res.json();
        }
    })
    .then(err => {
        if (err && err.message) {
            alert(err.message);
        }
    });
});

// const chb = addForm.querySelector("[type=\"checkbox\"]");
// console.log(chb);
// chb.addEventListener("change", e => {
//     console.log(chb.checked);
// })
