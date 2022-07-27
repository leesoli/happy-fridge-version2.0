import React, {useState, useEffect} from 'react';
import { IoMdExit } from "react-icons/io";
import { switchBackground, closeSidebar } from '../helpers';

export default function RecipeCheckbox (props) {
  const vegetables = Object.keys(props.formData.vegetableOptions);
  const dairyAndEggs = Object.keys(props.formData.dairyAndEggOptions);
  const fruits = Object.keys(props.formData.fruitOptions);
  const meats = Object.keys(props.formData.meatOptions);

  return (
    <div>
      <form
        className="form"
        onSubmit={(e) => {
          switchBackground(false);
          props.handleSubmit(e);
        }}
      >
        <button
          className="sidebar-close-btn"
          onClick={closeSidebar}
        >
          Close
          <IoMdExit className="sidebar-icon" />
        </button>
        <div className="category-wrapper">
        <h3 className="food-category-title">Vegetables</h3>
          {vegetables.map((item, index) => {
            return (
            <div
              key={index}
              className="food-category-container"
            >
              <input
                id={item}
                name={`vegetableOptions`}
                type="checkbox"
                checked={props.formData.vegetableOptions[item]}
                onChange={props.handleChange}>
              </input>
              <label htmlFor={item}>{item}</label>
            </div>
          )})}
        </div>

        <div className="category-wrapper">
        <h3 className="food-category-title">Dairy And Eggs</h3>
          {dairyAndEggs.map((item, index) => {
            return (
            <div
              key={index}
              className="food-category-container"
            >
              <input
                id={item}
                name={`dairyAndEggOptions`}
                type="checkbox"
                checked={props.formData.dairyAndEggOptions[item]}
                onChange={props.handleChange}>
              </input>
              <label htmlFor={item}>{item}</label>
            </div>
          )})}
        </div>

        <div className="category-wrapper">
        <h3 className="food-category-title">Fruit</h3>
          {fruits.map((item, index) => {
            return (
            <div
              key={index}
              className="food-category-container"
            >
              <input
                id={item}
                name={`fruitOptions`}
                type="checkbox"
                checked={props.formData.fruitOptions[item]}
                onChange={props.handleChange}>
              </input>
              <label htmlFor={item}>{item}</label>
            </div>
          )})}
        </div>

        <div className="category-wrapper">
        <h3 className="food-category-title">Meat</h3>
          {meats.map((item, index) => {
            return (
              <div
              key={index}
              className="food-category-container"
            >
              <input
                id={item}
                name={`meatOptions`}
                type="checkbox"
                checked={props.formData.meatOptions[item]}
                onChange={props.handleChange}>
              </input>
              <label htmlFor={item}>{item}</label>
            </div>
          )})}
        </div>

        <button className="find-recipe-btn">Find Recipe</button>
      </form>
    </div>
  )
}