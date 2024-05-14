const INPUT_INITIAL = '';

const PRIORITY_FORMS = {
    HIGH_PRIORITY_FORM: 0,
    LOW_PRIORITY_FORM: 1
}

const STATUS = {
    TO_DO : "To do",
    IN_PROGRESS : "In progress",
    DONE : "Done",
};
const PRIORITY = {
    HIGH : 'high',
    LOW : 'low'
};

const ERRORS = {
    NOT_FOUND_TASK : "Error, not found task!",
    ERROR_INPUT_TASK : 'Минимальная длина текста задачи 3 символа, максимальная 30!\nВведите заново.',
    ERROR_LENGTH : 'Wrong legnth string!'
};

export { INPUT_INITIAL, PRIORITY_FORMS, STATUS, PRIORITY, ERRORS };