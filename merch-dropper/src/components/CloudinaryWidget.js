import React, { Fragment } from "react";
import {useStyles} from "../components/Component-Styles/addProduct-styles"

const ImageUpload = ({ design, setDesign, designAdded, setDesignAdded }) => {
  const classes = useStyles();
  let widget = window.cloudinary.createUploadWidget(
    {
      cloudName: "dze74ofbf",
      uploadPreset: "logoFromWidget",
      sources: ["local", "url"],
      showAdvancedOptions: false,
      cropping: false,
      multiple: false,
      defaultSource: "local"
    },
    (error, result) => {
      if (result.event === "success") {
        const data = result.info;

        setDesign({
          ...design,
          design_name: data.original_filename,
          design_url: data.url,
          thumbnail_url: data.thumbnail_url
        });
        setDesignAdded(designAdded + 1);
      }
    }
  );

  const showWidget = function() {
    widget.open();
  };

  return (
    <Fragment>
      <button className={classes.button} onClick={showWidget}>
        Upload New Design
      </button>
    </Fragment>
  );
};
export default ImageUpload;
