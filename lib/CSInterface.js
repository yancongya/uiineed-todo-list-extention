/*************************************************************************
* ADOBE CONFIDENTIAL
* ___________________
*
* Copyright 2014 Adobe
* All Rights Reserved.
*
* NOTICE: All information contained herein is, and remains
* the property of Adobe and its suppliers, if any. The intellectual
* and technical concepts contained herein are proprietary to Adobe
* and its suppliers and are protected by all applicable intellectual
* property laws, including trade secret and copyright laws.
* Dissemination of this information or reproduction of this material
* is strictly forbidden unless prior written permission is obtained
* from Adobe.
**************************************************************************/

/**
 * CSInterface - v9.4.0
 */

/**
 * @class
 * This is the entry point to the CEP extensibility infrastructure.
 * Instantiate this object and use it to:
 * <ul>
 * <li>Access information about the host application in which an extension is running</li>
 * <li>Launch an extension</li>
 * <li>Register interest in event notifications, and dispatch events</li>
 * </ul>
 *
 * @return A new CSInterface object
 */
function CSInterface() {
  var cs = window.cep;
  this.hostEnvironment = JSON.parse(window.__adobe_cep__.getHostEnvironment());
  this.hostCapabilities = JSON.parse(window.__adobe_cep__.getHostCapabilities());
  
  /**
   * Retrieves information about the host environment in which the extension is currently running.
   *
   * @return A \c #HostEnvironment object.
   */
  this.getHostEnvironment = function() {
    this.hostEnvironment = JSON.parse(window.__adobe_cep__.getHostEnvironment());
    return this.hostEnvironment;
  };

  /**
   * Closes this extension.
   */
  this.closeExtension = function() {
    window.__adobe_cep__.closeExtension();
  };

  /**
   * Evaluates a JavaScript script in the context of the browser,
   * if this extension is running in the Chrome runtime.
   *
   * @param script The JavaScript script.
   * @return The result of evaluation, or the empty string if the call fails.
   */
  this.evalScript = function(script, callback) {
    if (callback === null || callback === undefined) {
      callback = function(result) {};
    }
    window.__adobe_cep__.evalScript(script, callback);
  };
  
  /**
   * Registers an interest in a JavaScript event that will be broadcast to all
   * extensions interested in it.
   *
   * @param type     The name of the JavaScript event type of interest.
   * @param listener The JavaScript function that will be called when events of this type are broadcast.
   * @param obj      Optional. The object containing the listener method, if any. Default is null.
   */
  this.addEventListener = function(type, listener, obj) {
    window.__adobe_cep__.addEventListener(type, listener, obj);
  };

  /**
   * Triggers a CEP event programmatically. Yoy can use it to dispatch
   * an event of a predefined type, or of a type you have defined.
   *
   * @param event A \c CSEvent object.
   */
  this.dispatchEvent = function(event) {
    if (typeof event.data == "object") {
      event.data = JSON.stringify(event.data);
    }
    window.__adobe_cep__.dispatchEvent(event);
  };
}; 