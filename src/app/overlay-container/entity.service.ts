/**
 * Here defins entities class and interface(type)
 */

import { Injectable, EventEmitter } from '@angular/core';

import {
  OverlayConfig,
  OverlayModel,
  OverlayStyle,
  OverlayType
} from './entities';

export * from './entities';

// import { ObjectEx } from '@sip/js-core';

/**
 * Following Code Convention
 * "member-ordering": [
 *   "constructor",
 *   "public-static-method",
 *   "public-static-field",
 *   "public-instance-method",
 *   "public-instance-field",
 *   "protected-static-method",
 *   "protected-static-field",
 *   "protected-instance-method",
 *   "protected-instance-field",
 *   "private-static-method",
 *   "private-static-field",
 *   "private-instance-method",
 *   "private-instance-field"
 * ]
 */
/**
 * It manages all entities
 *
 * @export
 */
@Injectable()
export class OverlayEntityService {
  constructor() {
    // event notification for config value changed
    this.configChanged = new EventEmitter<OverlayConfig>();
    this.configChanged.subscribe(this.onConfigChanged.bind(this));

    // default values
    this._config = {
      typeOptions: OverlayType
    };
    this._model = {
      // Add new properties in below
    };
  }

  isWhatType(overlayModel, overlayConfig?) {
    return overlayConfig && overlayConfig.type ? overlayConfig.type : ((overlayModel.contentTemplate && !overlayModel.contentComponent) ? 'template' : 'component');
  }

  //#region public APIs
  /**
   * Print the object in string. for debug.
   *
   * @returns JSON string including members
   * @memberof OverlayEntityService
   */
  toString() {
    const obj = {
      config: this._config,
      model: this._model,
    };
    return JSON.stringify(obj, null, 2);
  }

  //#region config, model
  /**
   * Set new config values to override old property values
   *
   * @param newValue JSON object in property name as key
   * @memberof OverlayEntityService
   */
  set config(newValue) {
    // check validation, ignore same value
    // if (!newValue || ObjectEx.equals(this._config, newValue)) { return; }

    // // update old config
    // this._config = ObjectEx.merge(this._config, newValue);
    this._config = newValue;
    // emit change nofication
    this.configChanged.emit(this.config);
  }

  /**
   * Return config's latest value.
   *
   * @memberof OverlayEntityService
   */
  get config() { return this._config; }

  /**
   * Set new model values to override old property values
   *
   * @param newValue JSON object in property name as key
   * @memberof OverlayEntityService
   */
  set model(newValue) {
    // check validation, ignore same value
    // if (!newValue || ObjectEx.equals(this._model, newValue)) { return; }

    // update old model
    // this._model = ObjectEx.merge(this._model, newValue);
    this._model = newValue;
  }

  /**
   * Return model's latest value.
   *
   * @memberof OverlayEntityService
   */
  get model() { return this._model; }

  /**
   * Set new style values to override old property values
   *
   * @param newValue JSON object in property name as key
   * @memberof OverlayEntityService
   */
  set style(newValue) {
    // // check validation, ignore same value
    // if (!newValue || ObjectEx.equals(this._style, newValue)) { return; }

    // // update old style
    // this._style = ObjectEx.merge(this._style, newValue);
    this._style = newValue;
  }

  /**
   * Return style's latest value.
   *
   * @memberof OverlayEntityService
   */
  get style() { return this._style; }
  //#endregion

  //#endregion

  //#region private members

  // When config value changed, update model value
  private onConfigChanged(value: OverlayConfig) {
    // update model
  }

  private configChanged;

  private _config;
  private _model;
  private _style;

  overlayContent;

  //#endregion
}
