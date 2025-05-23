let B7Validator = {
    handleSubmit:(event) => {
        event.preventDefault();
        let send = true;

        let inputs = form.querySelectorAll('input');

        B7Validator.clearErrors();
        
        for(let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let check = B7Validator.checkInput(input);

            if(check !== true) {
                send = false;
                B7Validator.showError(input, check);
            }
        }

        send = false;

        if(send) {
            form.submit();
        }
    },

    checkInput:(input) => {
        let rules = input.getAttribute('data-rules');

        if(rules !== null) {
            rules = rules.split('|');

            for(let k in rules) {
                let rDetails = rules[k].split('=');

                switch(rDetails[0]) {
                    case 'required':
                        if(input.value == '') {
                            return 'Este campo é obrigatório.';
                        }
                    break;
                    case 'min':
                        if(input.value.length < rDetails[1]) {
                            return 'Este campo deve ter pelo menos ' + rDetails[1] + ' caracteres.';
                        }
                    break;
                    case 'email':
                        if(input.value != '') {
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\\.,;:\s@"]+\.)+[^<>()\[\]\\.,;:\s@"]{2,})$/;
                            if(!regex.test(input.value.toLowerCase())) {
                                return 'E-mail inválido.'
                            }
                        }
                    break;
                }
            }
        }

        return true;
    },

    showError:(input, error) => {
        input.style.borderColor = '#f00';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },
    
    clearErrors:() => {
        let inputs = form.querySelectorAll('input');
        for(let i = 0; i < inputs.length; i++) {
            inputs[i].style = '';
        }

        let errorElements = document.querySelectorAll('.error');
        for(let i = 0; i < errorElements.length; i++) {
            errorElements[i].remove();
        }
    }
}

let form = document.querySelector('.b7validator');
form.addEventListener('submit', B7Validator.handleSubmit);