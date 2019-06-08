import React from 'react';
import App from './App';

import renderer from 'react-test-renderer';
import CustomButton from "./src/components/button";
import BackIcon from "./src/components/back-icon";
import List from "./src/components/list";
import Map from "./src/components/map";
import Input from "./src/components/text-input";
import TextLink from "./src/components/text-link";
import {SettingsScreen} from "./src/screens/profile/Settings";
import PasswordRecover from "./src/screens/password-recover/password-recover";
import Login from "./src/screens/login/Login";
import {Provider} from "react-redux";
import configureMockStore from "redux-mock-store";
import ChangePassword from "./src/screens/change-password/change-password";
import {HomeScreen} from "./src/screens/home/Home";
import {ListScreen} from "./src/screens/list/ListScreen";
import {Details} from "./src/screens/details/details";
import {DetailsTasks} from "./src/screens/details/Details-Tasks";


const mockStore = configureMockStore();
const store = mockStore({});

//APP
it('Render app without crashing', () => {
  const rendered = renderer.create(<App />, {
    createNodeMock: (element) => {
      if (element.type === PersistGate) { return element.props.children }
      return null;
    }
  });
  expect(rendered).toBeTruthy();
});

//COMPONENTS
it ('Render custom button', () => {
  const rendered = renderer.create(<CustomButton label={'test button'}/>);
  expect(rendered).toBeTruthy();
});

it ('Render back icon', () => {
  const rendered = renderer.create(<BackIcon />);
  expect(rendered).toBeTruthy();
});

it ('Render list', () => {
  const rendered = renderer.create(<List />);
  expect(rendered).toBeTruthy();
});

it ('Render map', () => {
  const rendered = renderer.create(<Map fieldTrips={[]}/>);
  expect(rendered).toBeTruthy();
});

it ('Render input', () => {
  const rendered = renderer.create(<Input />);
  expect(rendered).toBeTruthy();
});

it ('Render text link', () => {
  const rendered = renderer.create(<TextLink />);
  expect(rendered).toBeTruthy();
});

//SCREENS
it ('Render login screen', () => {
  const rendered = renderer.create(<Provider store={store}><Login/></Provider>);
  expect(rendered).toBeTruthy();
});

it ('Render change password screen', () => {
  const rendered = renderer.create(<Provider store={store}><ChangePassword/></Provider>);
  expect(rendered).toBeTruthy();
});

it ('Render profile screen', () => {
  const rendered = renderer.create(<SettingsScreen profile={{
    "profile": {
      "username": "rober",
      "email": "robertops1818@gmail.com",
      "name": "Roberto",
      "surname": "Pérez Sánchez"
    }
  }}/>);
  expect(rendered).toBeTruthy();
});

it ('Render password recovery screen', () => {
  const rendered = renderer.create(<PasswordRecover/>);
  expect(rendered).toBeTruthy();
});

it ('Render home screen', () => {
  const rendered = renderer.create(<Provider store={store}><HomeScreen list={[]}/></Provider>);
  expect(rendered).toBeTruthy();
});

it ('Render field trips list screen', () => {
  const rendered = renderer.create(<Provider store={store}><ListScreen /></Provider>);
  expect(rendered).toBeTruthy();
});

