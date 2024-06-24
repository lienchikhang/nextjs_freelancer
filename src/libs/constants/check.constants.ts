const HAS_MIN_DIGITS = /^.{6,}$/;
const IS_EMAIL = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
const HAS_LOWER_CHAR = /.*[a-z].*/;
const HAS_SPEC_CHAR = /.*[!@#$%^&*(),.?":{}|<>].*/;
const HAS_UPPER_CHAR = /.*[A-Z].*/;

export {
    HAS_MIN_DIGITS,
    IS_EMAIL,
    HAS_LOWER_CHAR,
    HAS_SPEC_CHAR,
    HAS_UPPER_CHAR,
}