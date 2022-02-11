function Validator(formSelector) {
    var formRules = {};

    /*
     *Quy ước tạo rule:
     * - Nếu có lỗi thì return 'error Message'
     * - Nếu ko lỗi thì return undefined
     */

    // Lấy element parent
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var validatorRules = {
        required: function (value) {
            return value.trim() ? undefined : 'Vui lòng nhập trường này!';
        },
        email: function (value) {
            const re =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))document.querySelector/;
            return re.test(value) ? undefined : 'Vui lòng nhập email của bạn!';
        },
        min: function (min) {
            return function (value) {
                return value.length >= min
                    ? undefined
                    : `Vui lòng nhập mật khẩu ít nhất ${min} ký tự!`;
            };
        },
        max: function (max) {
            return function (value) {
                return value.length <= max
                    ? undefined
                    : `Vui lòng nhập trường nhiều nhất ${max} ký tự!`;
            };
        },
        minDate: function (min) {
            return function (value) {
                return new Date(getMinDay(min)) < new Date(value)
                    ? undefined
                    : `Ngày bắt đầu nghỉ phải sau ${min} ngày nộp đơn!`;
            };
        },
        afterDate: function (value) {
            return new Date(getToDay()) <= new Date(value)
                ? undefined
                : `Hạn nộp phải được thiết lập trong ngày hoặc sau hôm nay!`;
        },
    };
    //Lấy ra form element trong DOM theo Selector
    var formElement = document.querySelector(formSelector);
    //Chỉ xử lý khi có form element tồn tại
    if (formElement) {
        var inputs = formElement.querySelectorAll('[name][rules]');

        for (let input of inputs) {
            let rules = input.getAttribute('rules').split('|');
            for (let rule of rules) {
                let ruleFunc = validatorRules[rule];

                if (rule.includes(':')) {
                    let ruleInfo = rule.split(':');
                    ruleFunc = validatorRules[ruleInfo[0]](ruleInfo[1]);
                }

                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc);
                } else {
                    formRules[input.name] = [ruleFunc];
                }
            }

            //Lắng nghe sự kiện để validate (blur, change, ...)
            input.onblur = handleValidate;
            input.oninput = handleClearError;
        }

        // Hàm thực hiện validate
        function handleValidate(event) {
            let rules = formRules[event.target.name];
            let errorMessage;

            rules.some(function (rule) {
                errorMessage = rule(event.target.value);
                return errorMessage;
            });

            if (errorMessage) {
                let formGroup = getParent(event.target, '.form-group');
                if (formGroup) {
                    event.target.classList.add('invalid');
                    let formMessage = formGroup.querySelector('.error-message');
                    if (formMessage) {
                        formMessage.innerText = errorMessage;
                    }
                }
            }

            return !errorMessage;
        }

        // Hàm clear error
        function handleClearError(event) {
            let formGroup = getParent(event.target, '.form-group');
            if (event.target.classList.contains('invalid')) {
                event.target.classList.remove('invalid');

                let formMessage = formGroup.querySelector('.error-message');
                if (formMessage) {
                    formMessage.innerText = '';
                }
            }
        }

        // Xử lý hành vi submit form
        formElement.onsubmit = (event) => {
            event.preventDefault();

            let isValid = true;
            for (let input of inputs) {
                if (!handleValidate({ target: input })) {
                    isValid = false;
                }
            }

            if (isValid) {
                formElement.submit();
            }
        };
    }
}
