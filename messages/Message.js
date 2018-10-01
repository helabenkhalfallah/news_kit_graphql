/**
 * Message Class
 * Message to display for sucess and fail
 * status
 */
class Message {
  /**
   * Message from attributes
   * @param {*} key
   * @param {*} value
   * @param {*} language
   * @param {*} status
   */
  constructor(key, value, language, status) {
    this._key = key;
    this._value = value;
    this._language = language;
    this._status = status;
  }

  /**
   * get Message key
   */
  get key() {
    return this._key;
  }

  /**
   * set Message key
   * @param {*} key
   */
  set key(key) {
    this._key = key;
  }

  /**
   * get Message value
   */
  get value() {
    return this._value;
  }

  /**
   * set Message value
   * @param {*} value
   */
  set value(value) {
    this._value = value;
  }

  /**
   * get Message language
   */
  get language() {
    return this._language;
  }

  /**
  * set Message language
  * @param {*} language
  */
  set language(language) {
    this._language = language;
  }

  /**
   * get Message status
   */
  get status() {
    return this._status;
  }

  /**
  * set Message status
  * @param {*} status
  */
  set status(status) {
    this._status = status;
  }

  /**
   * convert Message to string
   * @return {String} Message toString()
   */
  toString() {
    return `(
      key : ${this._key}, 
      value : ${this._value} , 
      language : ${this._language},
      status : ${this._status}
    )`;
  }
}

export default Message;
