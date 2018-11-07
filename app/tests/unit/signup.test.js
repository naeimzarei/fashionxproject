var signup_controller = require('../../controllers/signup-controller');
var util = require('../../util/util');

const VALIDATION_ERRORS = util.VALIDATION_ERRORS;

var invalid_dummy_profile = {
    first_name: 'Emily',
    password: 'password',
    email: 'fakeemailnobodyeverusesanymore@gmail.com',
    age: 17,
    instagram_handle: 'handle',
    blog: 'blog',
    height_ft: '-5',
    height_in: '-5',
    weight: '-15',
    bust_cup: 'Bust C',
    bust_band: 'A',
    waist: -4,
    hips: -4,
    jean_size: 'short',
    shirt_size: 'medium',
    leg_length: -4,
    torso_length: 'Short'
}

var invalid_type_dummy_profile = {
    first_name: '4',
    password: 'Password1',
    email: 'fakeemailnobodyeverusesanymore@gmail.com',
    age: '18',
    instagram_handle: 4,
    blog: 4,
    height_ft: '5',
    height_in: '5',
    weight: '155',
    bust_cup: 3,
    bust_band: 4,
    waist: '5',
    hips: '5',
    jean_size: 'Medium (M)',
    shirt_size: 'Medium (M)',
    leg_length: '5',
    torso_length: 'Long'
}

valid_dummy_profile = {
    first_name: 'Emily',
    password: 'Password1',
    email: 'fakeemailnobodyeverusesanymore@gmail.com',
    age: '18',
    instagram_handle: 'handle',
    blog: 'blog.com',
    height_ft: '5',
    height_in: '11',
    weight: '155',
    bust_cup: 'C',
    bust_band: 'Band B',
    waist: '33',
    hips: '33',
    jean_size: 'Medium (M)',
    shirt_size: 'Medium (M)',
    leg_length: '33',
    torso_length: 'Average'
}

test('should give error when incorrect profile information is given', async () => {
    var result = await signup_controller.validate(invalid_dummy_profile)

    expect(result.password).toEqual(VALIDATION_ERRORS['PASSWORD_INVALID'])
    expect(result.age).toEqual(VALIDATION_ERRORS['AGE_INVALID'])
    expect(result.blog).toEqual(VALIDATION_ERRORS['BLOG_INVALID'])
    expect(result.height_ft).toEqual(VALIDATION_ERRORS['HEIGHT_FT_INVALID'])
    expect(result.height_in).toEqual(VALIDATION_ERRORS['HEIGHT_IN_INVALID'])
    expect(result.bust_cup).toEqual(VALIDATION_ERRORS['BUST_CUP_INVALID'])
    expect(result.bust_band).toEqual(VALIDATION_ERRORS['BUST_BAND_INVALID'])
    expect(result.waist).toEqual(VALIDATION_ERRORS['WAIST_INVALID'])
    expect(result.hips).toEqual(VALIDATION_ERRORS['HIPS_INVALID'])
    expect(result.jean_size).toEqual(VALIDATION_ERRORS['JEAN_SIZE_INVALID'])
    expect(result.shirt_size).toEqual(VALIDATION_ERRORS['SHIRT_SIZE_INVALID'])
    expect(result.leg_length).toEqual(VALIDATION_ERRORS['LEG_LENGTH_INVALID'])
    expect(result.torso_length).toEqual(VALIDATION_ERRORS['TORSO_LENGTH_INVALID'])
})

test('should give error when incorrect data type is passed', async () => {
    var result = await signup_controller.validate(invalid_type_dummy_profile);

    expect(result.first_name).toEqual(VALIDATION_ERRORS['FIRST_NAME_INVALID'])
    expect(result.blog).toEqual(VALIDATION_ERRORS['BLOG_INVALID'])
    expect(result.bust_cup).toEqual(VALIDATION_ERRORS['BUST_CUP_INVALID'])
    expect(result.bust_band).toEqual(VALIDATION_ERRORS['BUST_BAND_INVALID'])
})

test('should not give error when correct profile information is given', async () => {
    var result = await signup_controller.validate(valid_dummy_profile)
    expect(result.password).toBeUndefined()
    expect(result.age).toBeUndefined()
    expect(result.blog).toBeUndefined()
    expect(result.height_ft).toBeUndefined()
    expect(result.height_in).toBeUndefined()
    expect(result.bust_cup).toBeUndefined()
    expect(result.bust_band).toBeUndefined()
    expect(result.waist).toBeUndefined()
    expect(result.hips).toBeUndefined()
    expect(result.jean_size).toBeUndefined()
    expect(result.shirt_size).toBeUndefined()
    expect(result.leg_length).toBeUndefined()
    expect(result.torso_length).toBeUndefined()
})

test('check first name validation', async () => {
    var result;
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

test('check age validation', async () => {
    var result;
    var clone = Object.assign({}, valid_dummy_profile)
    clone.age = 'age'
    result = await signup_controller.validate(clone)
    expect(result.age).toEqual(VALIDATION_ERRORS['AGE_INVALID'])
    clone.age = '0'
    result = await signup_controller.validate(clone)
    expect(result.age).toEqual(VALIDATION_ERRORS['AGE_INVALID'])
    clone.age = '17'
    result = await signup_controller.validate(clone)
    expect(result.age).toEqual(VALIDATION_ERRORS['AGE_INVALID'])
    clone.age = '18'
    result = await signup_controller.validate(clone)
    expect(result.age).toBeUndefined()
    clone.age = '19'
    result = await signup_controller.validate(clone)
    expect(result.age).toBeUndefined()
    clone.age = '-1'
    result = await signup_controller.validate(clone)
    expect(result.age).toEqual(VALIDATION_ERRORS['AGE_INVALID'])
})

test('check blog validation', async () => {
    var result;
    var clone = Object.assign({}, valid_dummy_profile)
    clone.blog = 'blog'
    result = await signup_controller.validate(clone)
    expect(result.blog).toEqual(VALIDATION_ERRORS['BLOG_INVALID'])
    clone.blog = 'blog.com'
    result = await signup_controller.validate(clone)
    expect(result.blog).toBeUndefined()
    clone.blog = 'blog-it.com'
    result = await signup_controller.validate(clone)
    expect(result.blog).toBeUndefined()
    clone.blog = 'http://localhost.com/blogs'
    result = await signup_controller.validate(clone)
    expect(result.blog).toBeUndefined()
    clone.blog = 'https://localhost.com/blogs'
    result = await signup_controller.validate(clone)
    expect(result.blog).toBeUndefined()
    clone.blog = 'www.blog.com'
    result = await signup_controller.validate(clone)
    expect(result.blog).toBeUndefined()
    clone.blog = 'http://wwww.blog.com'
    result = await signup_controller.validate(clone)
    expect(result.blog).toBeUndefined()
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

test('check weight validation', async () => {
    var result;
    var clone = Object.assign({}, valid_dummy_profile)
    clone.weight = 'weight'
    result = await signup_controller.validate(clone)
    expect(result.weight).toEqual(VALIDATION_ERRORS['WEIGHT_INVALID'])
    clone.weight = '-5'
    result = await signup_controller.validate(clone)
    expect(result.weight).toEqual(VALIDATION_ERRORS['WEIGHT_INVALID'])
    clone.weight = '0'
    result = await signup_controller.validate(clone)
    expect(result.weight).toBeUndefined()
    clone.weight = '5'
    result = await signup_controller.validate(clone)
    expect(result.weight).toBeUndefined()
})

test('check bust_cup validation', async () => {
    var result;
    var clone = Object.assign({}, valid_dummy_profile)
    clone.bust_cup = 'bust_cup'
    result = await signup_controller.validate(clone)
    expect(result.bust_cup).toEqual(VALIDATION_ERRORS['BUST_CUP_INVALID'])
    clone.bust_cup = 'A'
    result = await signup_controller.validate(clone)
    expect(result.bust_cup).toBeUndefined()
    clone.bust_cup = 'B'
    result = await signup_controller.validate(clone)
    expect(result.bust_cup).toBeUndefined()
    clone.bust_cup = 'C'
    result = await signup_controller.validate(clone)
    expect(result.bust_cup).toBeUndefined()
    clone.bust_cup = 'D'
    result = await signup_controller.validate(clone)
    expect(result.bust_cup).toEqual(VALIDATION_ERRORS['BUST_CUP_INVALID'])
})

test('check bust_band validation', async () => {
    var result;
    var clone = Object.assign({}, valid_dummy_profile)
    clone.bust_band = 'bust_band'
    result = await signup_controller.validate(clone)
    expect(result.bust_band).toEqual(VALIDATION_ERRORS['BUST_BAND_INVALID'])
    clone.bust_band = 'Band A'
    result = await signup_controller.validate(clone)
    expect(result.bust_band).toBeUndefined()
    clone.bust_band = 'Band B'
    result = await signup_controller.validate(clone)
    expect(result.bust_band).toBeUndefined()
    clone.bust_band = 'Band C'
    result = await signup_controller.validate(clone)
    expect(result.bust_band).toBeUndefined()
    clone.bust_band = 'Band D'
    result = await signup_controller.validate(clone)
    expect(result.bust_band).toEqual(VALIDATION_ERRORS['BUST_BAND_INVALID'])
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

test('check hips validation', async () => {
    var result;
    var clone = Object.assign({}, valid_dummy_profile)
    clone.hips = 'hips'
    result = await signup_controller.validate(clone)
    expect(result.hips).toEqual(VALIDATION_ERRORS['HIPS_INVALID'])
    clone.hips = '-5'
    result = await signup_controller.validate(clone)
    expect(result.hips).toEqual(VALIDATION_ERRORS['HIPS_INVALID'])
    clone.hips = '0'
    result = await signup_controller.validate(clone)
    expect(result.hips).toBeUndefined()
    clone.hips = '5'
    result = await signup_controller.validate(clone)
    expect(result.hips).toBeUndefined()
})

test('check jean_size validation', async () => {
    var result;
    var clone = Object.assign({}, valid_dummy_profile)
    clone.jean_size = 'jean_size'
    result = await signup_controller.validate(clone)
    expect(result.jean_size).toEqual(VALIDATION_ERRORS['JEAN_SIZE_INVALID'])
    clone.jean_size = 'medium'
    result = await signup_controller.validate(clone)
    expect(result.jean_size).toEqual(VALIDATION_ERRORS['JEAN_SIZE_INVALID'])
    clone.jean_size = 'Extra Small (XS)'
    result = await signup_controller.validate(clone)
    expect(result.jean_size).toBeUndefined()
    clone.jean_size = 'Small (S)'
    result = await signup_controller.validate(clone)
    expect(result.jean_size).toBeUndefined()
    clone.jean_size = 'Medium (M)'
    result = await signup_controller.validate(clone)
    expect(result.jean_size).toBeUndefined()
    clone.jean_size = 'Large (L)'
    result = await signup_controller.validate(clone)
    expect(result.jean_size).toBeUndefined()
    clone.jean_size = 'Extra Large (XL)'
    result = await signup_controller.validate(clone)
    expect(result.jean_size).toBeUndefined()
})

test('check shirt_size validation', async () => {
    var result;
    var clone = Object.assign({}, valid_dummy_profile)
    clone.shirt_size = 'shirt_size'
    result = await signup_controller.validate(clone)
    expect(result.shirt_size).toEqual(VALIDATION_ERRORS['SHIRT_SIZE_INVALID'])
    clone.shirt_size = 'medium'
    result = await signup_controller.validate(clone)
    expect(result.shirt_size).toEqual(VALIDATION_ERRORS['SHIRT_SIZE_INVALID'])
    clone.shirt_size = 'Extra Small (XS)'
    result = await signup_controller.validate(clone)
    expect(result.shirt_size).toBeUndefined()
    clone.shirt_size = 'Small (S)'
    result = await signup_controller.validate(clone)
    expect(result.shirt_size).toBeUndefined()
    clone.shirt_size = 'Medium (M)'
    result = await signup_controller.validate(clone)
    expect(result.shirt_size).toBeUndefined()
    clone.shirt_size = 'Large (L)'
    result = await signup_controller.validate(clone)
    expect(result.shirt_size).toBeUndefined()
    clone.shirt_size = 'Extra Large (XL)'
    result = await signup_controller.validate(clone)
    expect(result.shirt_size).toBeUndefined()
})