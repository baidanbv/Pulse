document.addEventListener("DOMContentLoaded", function () {
    const categories = document.querySelectorAll(".filter-category");

    categories.forEach(category => {
        const button = category.querySelector("button");
        const content = category.querySelector(".filter-options");

        button.addEventListener("click", function () {
            content.classList.toggle("active");

            if (content.classList.contains("active")) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = "0";
            }
        });
    });
});

