import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './Searchbar.module.css';

export default class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = { newQuery: '' };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.newQuery);
    this.setState({ newQuery: '' });
  };

  handleChange = e => {
    this.setState({ newQuery: e.target.value.trim().toLowerCase() });
  };

  render() {
    return (
      <>
        <header className={css.searchbar}>
          <form className={css.searchForm} onSubmit={this.handleSubmit}>
            <button type="submit" className={css.searchFormButton}>
              <span className={css.searchFormLabel}></span>
            </button>

            <input
              className={css.searchFormInput}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.newQuery}
              onChange={this.handleChange}
            />
          </form>
        </header>
      </>
    );
  }
}

// import { Component } from 'react';
// // import PropTypes from 'prop-types';
// // import css from './Searchbar.module.css';

// export class Searchbar extends Component() {
//   // static propTypes = {
//   //   onSubmit: PropTypes.func.isRequired,
//   // };

//   // state = { newQuery: '' };

//   // handleSubmit = e => {
//   //   e.preventDefault();
//   //   // this.props.onSubmit(this.state.newQuery);
//   //   // this.setState({ newQuery: '' });
//   // };

//   // handleChange = event => {
//   //   // this.setState({ newQuery: event.target.value.trim().toLowerCase() });
//   // };

//   render() {
//     return (
//       <>
//         {/* <header className={css.searchbar}>
//           <form className={css.searchForm} onSubmit={this.handleSubmit}>
//             <button type="submit" className={css.searchFormButton}>
//               <span className={css.searchFormLabel}></span>
//             </button>

//             <input
//               className={css.searchFormInput}
//               type="text"
//               autoComplete="off"
//               autoFocus
//               placeholder="Search images and photos"
//               value={this.state.newQuery}
//               onChange={this.handleChange}
//             />
//           </form>
//         </header> */}
//       </>
//     );
//   }
// }
