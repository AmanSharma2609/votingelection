import { shallow, configure, render, mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';
import { BrowserRouter  } from 'react-router-dom';



import LoginPage from '../components/adminModule/loginPage'

configure({ adapter: new Adapter() });


describe('Login component', () => {
  it('Login: renders correctly', () => {
    const wrapper = shallow(
      <LoginPage />
      )
    expect(wrapper.find(<LoginPage />)).toMatchSnapshot();
  });
  // it("should create an entry in component state with the event value", () => {
  //   // given
  //   const component = mount(<BrowserRouter>
  //     <LoginPage />
  //     </BrowserRouter>);
  //   const form = component.find('TextField');
  //   // when
  //   form.props().onChange({target: {
  //     name: 'myName',
  //     value: 'myValue'
  //   }});
  //   // then
  //   expect(component.state('admin_email')).toEqual('myValue');
  // });
})
  // it('should toggle the state.disabled property when clicking on first button', () => {
  //   const wrapper = shallow(<LoginPage />);
  //   const firstIconButton = wrapper.find('IconButton');
  //   expect(wrapper.state()).toEqual(true);

  //   expect(wrapper.state()).toEqual(false);
  
  // })
//   it('not has ActivityIndicator when state loading false', () => {
//     const wrapper = shallow(<LoginPage />);
  
//     c.instance().handleClickShowPassword().then(() => {
//       expect(c.instance().state.showPassword).toEqual(false);
//     });
//     expect(c.instance().state.isLoading).toEqual(true);
// })
// const c = shallow(<LoginPage />);
// c.instance().handleClickShowPassword().then(() => {
//   expect(c.instance().state.showPassword).toEqual(false);
// });
// expect(c.instance().state.showPassword).toEqual(true);
// });
 