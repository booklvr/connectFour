/* eslint-disable */
import axios from 'axios';
import { showAlert } from '../alert';

const onStartUI = (function () {
  const DOMStrings = {
    // BY ID
    logout: '#logout',
  };

  // RETURN FUNCTIONS
  return {
    getDOMStrings: function () {
      return DOMStrings;
    },
    logout: async function () {
      try {
        const res = await axios({
          method: 'GET',
          url: 'api/v1/auth/logout',
        });
        if (res.data.status === 'success') {
          location.reload();
          console.log('res.data.status', res.data.status);
        }
      } catch (err) {
        console.log(err.response);
        showAlert('error', 'Error logging out!  Try again');
      }
    },
  };
})();

export { onStartUI };
