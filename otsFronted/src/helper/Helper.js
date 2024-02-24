import CryptoJS from 'crypto-js';

class Helper {
  constructor(SECRET_KEY) {
    this.SECRET_KEY = SECRET_KEY;
  }

  encrypt(text) {
    const iv = CryptoJS.lib.WordArray.random(16);
    
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(text), CryptoJS.enc.Utf8.parse(this.SECRET_KEY), {
      iv: iv,
      mode: CryptoJS.mode.CFB,
      padding: CryptoJS.pad.Pkcs7,
    });
    
    const result = `${iv.toString(CryptoJS.enc.Hex)}:${encrypted.ciphertext.toString(CryptoJS.enc.Hex)}`;
    
    return result;
  }

  decrypt(text) {
    const [ivHex, cipherText] = text.split(':');
    const iv = CryptoJS.enc.Hex.parse(ivHex);
    
    const decrypted = CryptoJS.AES.decrypt({ ciphertext: CryptoJS.enc.Hex.parse(cipherText) }, CryptoJS.enc.Utf8.parse(this.SECRET_KEY), {
      iv: iv,
      mode: CryptoJS.mode.CFB,
      padding: CryptoJS.pad.Pkcs7,
    });
    
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}

export default Helper;
