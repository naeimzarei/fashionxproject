var signup_controller = require('../../controllers/signup-controller');
var util = require('../../util/util');

const VALIDATION_ERRORS = util.VALIDATION_ERRORS;

var valid_dummy_profile = {
    first_name: 'Emily',
    email: 'fakemailnobodyeverusesanymore@gmail.com',
    dob: '2018-11',
    instagram_handle: '@handle',
    zip: '74383',
    paypal: '@fake',
    height_ft: '5',
    height_in: '11',
    bust_cup: 'G',
    bust_band: '40',
    waist: '33',
    shirt_size: 'M',
    jean_size: '30',
    torso_length: 'Regular',
    leg_length: 'Petite'
}

test('check first name validation', async () => {
    var result
    var clone = Object.assign({}, valid_dummy_profile)
    clone.first_name = '4'
    result = await signup_controller.validate(clone)
    expect(result.first_name).toEqual(VALIDATION_ERRORS['FIRST_NAME_INVALID'])
    clone.first_name = 'Apple4'
    result = await signup_controller.validate(clone)
    expect(result.first_name).toEqual(VALIDATION_ERRORS['FIRST_NAME_INVALID'])
    clone.first_name = '4Apple'
    result = await signup_controller.validate(clone)
    expect(result.first_name).toEqual(VALIDATION_ERRORS['FIRST_NAME_INVALID'])
    clone.first_name = '4Apple4'
    result = await signup_controller.validate(clone)
    expect(result.first_name).toEqual(VALIDATION_ERRORS['FIRST_NAME_INVALID'])
    clone.first_name = 'Ap4ple'
    result = await signup_controller.validate(clone)
    expect(result.first_name).toEqual(VALIDATION_ERRORS['FIRST_NAME_INVALID'])
    clone.first_name = '4Ap4ple4'
    result = await signup_controller.validate(clone)
    expect(result.first_name).toEqual(VALIDATION_ERRORS['FIRST_NAME_INVALID'])
})

test('check email validation', async () => {
    var result;
    var clone = Object.assign({}, valid_dummy_profile)
    clone.email = 'email@gmail.com'
    result = await signup_controller.validate(clone)
    expect(result.email).toBeUndefined()
    clone.email = 'email@@gmail.com'
    result = await signup_controller.validate(clone)
    expect(result.email).toEqual(VALIDATION_ERRORS['EMAIL_INVALID_SYNTAX'])
    clone.email = 'email@email.com'
    result = await signup_controller.validate(clone)
    expect(result.email).toBeUndefined();
    clone.email = 'email@gmail.domain.com'
    result = await signup_controller.validate(clone)
    expect(result.email).toBeUndefined();
    clone.email = 'email@gmail'
    result = await signup_controller.validate(clone)
    expect(result.email).toEqual(VALIDATION_ERRORS['EMAIL_INVALID_SYNTAX'])
})

test('check password validation', async () => {
    var result;
    var clone = Object.assign({}, valid_dummy_profile)
    clone.password = 'password'
    result = await signup_controller.validate(clone)
    expect(result.password).toEqual(VALIDATION_ERRORS['PASSWORD_INVALID'])
    clone.password = 'Password'
    result = await signup_controller.validate(clone)
    expect(result.password).toEqual(VALIDATION_ERRORS['PASSWORD_INVALID'])
    clone.password = 'pass'
    result = await signup_controller.validate(clone)
    expect(result.password).toEqual(VALIDATION_ERRORS['PASSWORD_INVALID'])
    clone.password = 'password1'
    result = await signup_controller.validate(clone)
    expect(result.password).toEqual(VALIDATION_ERRORS['PASSWORD_INVALID'])
    clone.password = 'Password1'
    result = await signup_controller.validate(clone)
    expect(result.password).toBeUndefined();
    clone.password = 'PasswordPassword'
    result = await signup_controller.validate(clone)
    expect(result.password).toEqual(VALIDATION_ERRORS['PASSWORD_INVALID'])
    clone.password = 'Password111111111111'
    result = await signup_controller.validate(clone)
    expect(result.password).toEqual(VALIDATION_ERRORS['PASSWORD_INVALID'])
    clone.password = 'Password1111'
    result = await signup_controller.validate(clone)
    expect(result.password).toBeUndefined();
    clone.password = 'Password1111`'
    result = await signup_controller.validate(clone)
    expect(result.password).toEqual(VALIDATION_ERRORS['PASSWORD_INVALID'])
    clone.password = 'Pas1'
    result = await signup_controller.validate(clone)
    expect(result.password).toEqual(VALIDATION_ERRORS['PASSWORD_INVALID'])
})

// do not remove. must be implemented later ...
test('test date of birth validation', async () => {
    var result;
    var clone = Object.assign({}, valid_dummy_profile)
    clone.dob = valid_dummy_profile.dob
    result = await signup_controller.validate(clone)
    expect(result.dob).toBeUndefined()
    // clone.dob = 'May 44, 2018'
    // result = await signup_controller.validate(clone)
    // expect(result.dob).toEqual(VALIDATION_ERRORS['AGE_INVALID'])
})

test('check instagram validation', async () => {
    var result;
    var clone = Object.assign({}, valid_dummy_profile)
    clone.instagram_handle = 'handle'
    result = await signup_controller.validate(clone)
    expect(result.instagram_handle).toEqual(VALIDATION_ERRORS['INSTAGRAM_HANDLE_INVALID'])
    clone.instagram_handle = '@handle'
    result = await signup_controller.validate(clone)
    expect(result.instagram_handle).toBeUndefined()
})

test('check zip validation', async () => {
    var result;
    var clone = Object.assign({}, valid_dummy_profile)
    clone.zip = 'ABCDE'
    result = await signup_controller.validate(clone)
    expect(result.zip).toEqual(VALIDATION_ERRORS['ZIP_INVALID'])
    clone.zip = '77417'
    result = await signup_controller.validate(clone)
    expect(result.zip).toBeUndefined()
    clone.zip = '774174'
    result = await signup_controller.validate(clone)
    expect(result.zip).toEqual(VALIDATION_ERRORS['ZIP_INVALID'])
})

test('check paypal validation', async () => {
    var result;
    var clone = Object.assign({}, valid_dummy_profile)
    clone.paypal = 'fake'
    result = await signup_controller.validate(clone)
    expect(result.paypal).toEqual(VALIDATION_ERRORS['PAYPAL_INVALID'])
    clone.paypal = '@fake'
    result = await signup_controller.validate(clone)
    expect(result.paypal).toBeUndefined()
})

test('check height_ft validation', async () => {
    var result;
    var clone = Object.assign({}, valid_dummy_profile)
    clone.height_ft = 'height_ft'
    result = await signup_controller.validate(clone)
    expect(result.height_ft).toEqual(VALIDATION_ERRORS['HEIGHT_FT_INVALID'])
    clone.height_ft = '-5'
    result = await signup_controller.validate(clone)
    expect(result.height_ft).toEqual(VALIDATION_ERRORS['HEIGHT_FT_INVALID'])
    clone.height_ft = '0'
    result = await signup_controller.validate(clone)
    expect(result.height_ft).toBeUndefined()
    clone.height_ft = '1'
    result = await signup_controller.validate(clone)
    expect(result.height_ft).toBeUndefined()
})

test('check height_in validation', async () => {
    var result;
    var clone = Object.assign({}, valid_dummy_profile)
    clone.height_in = 'height_in'
    result = await signup_controller.validate(clone)
    expect(result.height_in).toEqual(VALIDATION_ERRORS['HEIGHT_IN_INVALID'])
    clone.height_in = '-5'
    result = await signup_controller.validate(clone)
    expect(result.height_in).toEqual(VALIDATION_ERRORS['HEIGHT_IN_INVALID'])
    clone.height_in = '0'
    result = await signup_controller.validate(clone)
    expect(result.height_in).toBeUndefined()
    clone.height_in = '12'
    result = await signup_controller.validate(clone)
    expect(result.height_in).toEqual(VALIDATION_ERRORS['HEIGHT_IN_INVALID'])
    clone.height_in = '11'
    result = await signup_controller.validate(clone)
    expect(result.height_in).toBeUndefined()
})

test('check bust_cup validation', async () => {
    var result;
    var clone = Object.assign({}, valid_dummy_profile)
    clone.bust_cup = 'Z'
    result = await signup_controller.validate(clone)
    expect(result.bust_cup).toEqual(VALIDATION_ERRORS['BUST_CUP_INVALID'])
    clone.bust_cup = 'E (DD)'
    result = await signup_controller.validate(clone)
    expect(result.bust_cup).toBeUndefined()
})

test('check bust_band validation', async () => {
    var result;
    var clone = Object.assign({}, valid_dummy_profile)
    clone.bust_band = '70'
    result = await signup_controller.validate(clone)
    expect(result.bust_band).toEqual(VALIDATION_ERRORS['BUST_BAND_INVALID'])
    clone.bust_band = '60'
    result = await signup_controller.validate(clone)
    expect(result.bust_band).toBeUndefined()
})

test('check waist validation', async () => {
    var result;
    var clone = Object.assign({}, valid_dummy_profile)
    clone.waist = 'waist'
    result = await signup_controller.validate(clone)
    expect(result.waist).toEqual(VALIDATION_ERRORS['WAIST_INVALID'])
    clone.waist = '-5'
    result = await signup_controller.validate(clone)
    expect(result.waist).toEqual(VALIDATION_ERRORS['WAIST_INVALID'])
    clone.waist = '0'
    result = await signup_controller.validate(clone)
    expect(result.waist).toBeUndefined()
    clone.waist = '5'
    result = await signup_controller.validate(clone)
    expect(result.waist).toBeUndefined()
})

test('check shirt_size validation', async () => {
    var result;
    var clone = Object.assign({}, valid_dummy_profile)
    clone.shirt_size = 'XXXL'
    result = await signup_controller.validate(clone)
    expect(result.shirt_size).toBeUndefined()
    clone.shirt_size = 'XXXXL'
    result = await signup_controller.validate(clone)
    expect(result.shirt_size).toEqual(VALIDATION_ERRORS['SHIRT_SIZE_INVALID'])
})

test('check jean_size validation', async () => {
    var result;
    var clone = Object.assign({}, valid_dummy_profile)
    clone.jean_size = '28 (Plus)'
    result = await signup_controller.validate(clone)
    expect(result.jean_size).toEqual(VALIDATION_ERRORS['JEAN_SIZE_INVALID'])
    clone.jean_size = '26 (Plus)'
    result = await signup_controller.validate(clone)
    expect(result.jean_size).toBeUndefined()
})

test('check torso_length validation', async () => {
    var result;
    var clone = Object.assign({}, valid_dummy_profile)
    clone.torso_length = 'Invalid'
    result = await signup_controller.validate(clone)
    expect(result.torso_length).toEqual(VALIDATION_ERRORS['TORSO_LENGTH_INVALID'])
    clone.torso_length = 'Regular'
    result = await signup_controller.validate(clone)
    expect(result.torso_length).toBeUndefined()
})

test('check leg_length validation', async () => {
    var result;
    var clone = Object.assign({}, valid_dummy_profile)
    clone.leg_length = 'Invalid'
    result = await signup_controller.validate(clone)
    expect(result.leg_length).toEqual(VALIDATION_ERRORS['LEG_LENGTH_INVALID'])
    clone.leg_length = 'Tall'
    result = await signup_controller.validate(clone)
    expect(result.leg_length).toBeUndefined()
})