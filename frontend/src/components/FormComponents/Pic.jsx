import React, { useState } from "react";

export default function Pic(props) {
  const [picIcon, setPicIcon] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);

  function updatePic(event) {
    const { name, files } = event.target;
    const selected = files[0];
    const allowedTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (selected && allowedTypes.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selected);
      props.updateImageArray(
        {
          id: props.id,
          image: selected,
        },
        name
      );
      setPicIcon(false);
    }
  }
  return (
    <label htmlFor={props.id}>
      <div
        className="pic"
        style={{
          background: imagePreview
            ? `url("${imagePreview}") no-repeat center/cover`
            : null,
        }}
      >
        <div className="insidePic">
          <input
            onChange={updatePic}
            name="images"
            type="file"
            id={props.id}
            accept="image/*"
          />
          {picIcon && (
            <svg
              width="36px"
              height="36px"
              viewBox="0 0 1024 1024"
              data-aut-id="icon"
              fillRule="evenodd"
            >
              <path
                className="rui-15D7A"
                d="M861.099 667.008v78.080h77.568v77.653h-77.568v77.141h-77.568v-77.184h-77.611v-77.611h77.611v-78.080h77.568zM617.515 124.16l38.784 116.437h165.973l38.827 38.827v271.659l-38.827 38.357-38.741-38.4v-232.832h-183.125l-38.784-116.48h-176.853l-38.784 116.48h-183.083v426.923h426.667l38.784 38.357-38.784 39.253h-465.493l-38.741-38.869v-504.491l38.784-38.827h165.973l38.827-116.437h288.597zM473.216 318.208c106.837 0 193.92 86.955 193.92 194.048 0 106.923-87.040 194.091-193.92 194.091s-193.963-87.168-193.963-194.091c0-107.093 87.083-194.048 193.963-194.048zM473.216 395.861c-64.213 0-116.352 52.181-116.352 116.395 0 64.256 52.139 116.437 116.352 116.437 64.171 0 116.352-52.181 116.352-116.437 0-64.213-52.181-116.437-116.352-116.437z"
              ></path>
            </svg>
          )}
        </div>
      </div>
    </label>
  );
}
