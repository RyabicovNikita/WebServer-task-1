document.addEventListener("click", async ({ target }) => {
  switch (target?.dataset?.type) {
    case "remove": {
      const id = target.dataset.id;
      await fetch(`/${id}`, { method: "DELETE" });

      target.closest("li").remove();
      break;
    }
    case "edit": {
      const newText = prompt("Введите новое название");
      if (!newText) return;
      await fetch(`/${target.dataset.id}`, {
        method: "POST",
        body: JSON.stringify({ title: newText }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      target.parentNode.querySelector("#note-titles").innerText = newText;
    }
  }
});
