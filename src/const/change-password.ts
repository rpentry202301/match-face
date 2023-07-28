export const dummyPasswords = {
  halfSizeEng: {
    seven: 'abcdefg',
    eight: 'abcdefg',
    nine: 'abcdefg',
  },

  halfSizeNum: {
    seven: '1234567',
    eight: '12345678',
    nine: '123456789',
  },

  halfSizeEngNum: {
    seven: 'abcd123',
    eight: 'abcd1234',
    nine: 'abcde1234',
  },

  halfSizeEngSymb: {
    seven: 'abcdef@',
    eight: 'abcdefg@',
    nine: 'abcdefgh@',
  },
  halfSizeNumSymb: {
    seven: '123456#',
    eight: '1234567#',
    nine: '12345678#',
  },
};

// 記号 . _ / # & % = ~ - + * @ ( ) < > [ ] { } が1つ以上含まれる、かつ半角英数字が含まれる、かつ8文字以上
export const correctPassword = 'newpassword#1';
// 条件に合致しないパスワード
export const incorrectPassword = 'incoreect';
// incorrectPasswordと一致しない,条件に合致しないパスワード
export const anyPassword = 'any';
