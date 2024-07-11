// formularz dodawania graczy
document.addEventListener('DOMContentLoaded', function() {
    const addButtons = document.querySelectorAll('.btn-add-player');
    const removeButtons = document.querySelectorAll('.btn-remove-player');
    
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetClass = button.getAttribute('data-target');
            const targetElement = document.querySelector(`.${targetClass}`);
            const currentRemoveButton = button.nextElementSibling;
            
            if (targetElement) {
                targetElement.classList.remove('hidden');
            }
            if (currentRemoveButton) {
                currentRemoveButton.classList.remove('hidden');
            }
            button.classList.add('hidden');
        });
    });

    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetClass = button.getAttribute('data-target');
            const targetElement = document.querySelector(`.${targetClass}`);
            const currentAddButton = button.previousElementSibling;
            
            if (targetElement) {
                targetElement.classList.add('hidden');
            }
            if (currentAddButton) {
                currentAddButton.classList.remove('hidden');
            }
            button.classList.add('hidden');
        });
    });
});
