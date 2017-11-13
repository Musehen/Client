import { Injectable } from '@angular/core';
import { isUndefined } from 'util';

@Injectable()
export class ValidateService {
  constructor() {
  }

  emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  validateRegisterInput(data, isEditData?) {
    if (!data.firstName) {
      return {
        isValid: false,
        msg: 'First Name is required.'
      };
    }
    if (!data.lastName) {
      return {
        isValid: false,
        msg: 'Last Name is required.'
      };
    }
    if (!data.username) {
      return {
        isValid: false,
        msg: 'Username is required.'
      };
    }
    if (data.username.length < 4) {
      return {
        isValid: false,
        msg: 'Username too short.'
      };
    }
    if (!data.email) {
      return {
        isValid: false,
        msg: 'Email is required.'
      };
    }
    if (!this.emailRegex.test(data.email)) {
      return {
        isValid: false,
        msg: 'Email is invalid.'
      };
    }
    if (!data.password) {
      return {
        isValid: false,
        msg: 'Password is required.'
      };
    }
    if (data.password) {
      if (data.password !== data.passwordConfirm) {
        return {
          isValid: false,
          msg: 'Passwords didn\'t match.'
        };
      }
      if (data.password.length < 6) {
        return {
          isValid: false,
          msg: 'Password too short.'
        };
      }
      if (data.password.length > 50) {
        return {
          isValid: false,
          msg: 'Password too long.'
        };
      }
    }
    return {
      isValid: true,
      msg: ''
    };
  }


  validateAddProductInput(data, isEditData?) {
    if (!data.name) {
      return {
        isValid: false,
        msg: 'Name is required.'
      };
    }

    if(!data.description){
      return {
        isValid: false,
        msg: 'Description is required.'
      };
    }

    if(!data.demoUrl){
      return {
        isValid: false,
        msg: 'Demo URL is required.'
      };
    }

    if(!data.imageUrl){
      return {
        isValid: false,
        msg: 'Image URL is required.'
      };
    }

    if(!data.price){
      return {
        isValid: false,
        msg: 'Price is required.'
      }
    }

    if(!isEditData){
      if(!data.sourceCode){
        return {
          isValid: false,
          msg: 'Source code is required.'
        };
      }
    }

    return {
      isValid: true,
      msg: ''
    };
  }

}
