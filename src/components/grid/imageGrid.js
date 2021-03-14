import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImages, saveList, getList } from "../../actions/imageActions";
import Gallery from "react-grid-gallery";
import RGallery from "react-photo-gallery";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { Button } from "react-bootstrap";
import Photo from "../photo";
import arrayMove from "array-move";
import { Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

const SortablePhoto = SortableElement((item) => <Photo {...item} />);
const SortableGallery = SortableContainer(({ items }) => (
  <RGallery
    photos={items}
    renderImage={(props) => <SortablePhoto {...props} />}
  />
));

const ImageGrid = () => {
  const dispatch = useDispatch();
  const { images, list } = useSelector((state) => state);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectionCount, setSelectionCount] = useState(0);
  const [step, setStep] = useState(0);

  const selectImage = (index, image) => {
    let images = selectedImages.slice();
    let img = images[index];
    if (img.hasOwnProperty("isSelected")) {
      img.isSelected = !img.isSelected;
      if (!img.isSelected && selectionCount > 0) {
        setSelectionCount(selectionCount - 1);
      } else {
        setSelectionCount(selectionCount + 1);
      }
    } else {
      img.isSelected = true;
      setSelectionCount(selectionCount + 1);
    }

    setSelectedImages(images);
  };

  const _handleNextStep = () => {
    let filterImages = [];
    for (let i = 0; i < selectedImages.length; i++) {
      if (selectedImages[i].isSelected) {
        filterImages.push(selectedImages[i]);
      }
    }

    setSelectedImages(filterImages);
    setStep(1);
  };

  const _handlePrevStep = () => {
    window.location = "/";
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setSelectedImages(arrayMove(selectedImages, oldIndex, newIndex));
  };

  const _handleSave = () => {
    dispatch(saveList(selectedImages));
    toast.success(`Ordered images has been saved.`);
  };

  useEffect(() => {
    if (list && list.length > 0) {
      setStep(1);
      setSelectedImages(list);
    } else if(step === 0) {
      dispatch(getImages());
    }
  }, [list]);

  useEffect(() => {
    dispatch(getList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let imgs = [];
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        imgs.push({
          id: images[i].id,
          src: images[i].picture,
          thumbnail: images[i].picture,
          thumbnailWidth: 2,
          thumbnailHeight: 2,
        });
      }

      if (!list) {
        setSelectedImages(imgs);
      }
    }
  }, [images]);

  return (
    <div className="pastbook-container">
      {step === 0 ? (
        <Row>
          <Col md={12}>
            <p className="text-left sub-header">
              Select 9 photos from below grid.
            </p>
            <p className="text-right selection-info">
              {" "}
              {selectionCount} of 9 photos
            </p>
            <Gallery
              images={selectedImages}
              onSelectImage={selectImage}
              rowHeight={110}
              enableImageSelection={selectionCount >= 9 ? false : true}
            />
          </Col>
          <Col md={12} className="image-grid-controllers">
            <Button
              variant="primary"
              onClick={() => _handleNextStep()}
              disabled={selectionCount === 0}
            >
              Next
            </Button>
          </Col>
        </Row>
      ) : (
        <Row className="justify-content-md-center">
          <Col md={11}>
            <p className="text-left">Drag selected photos to re-order</p>
            <SortableGallery
              items={selectedImages}
              onSortEnd={onSortEnd}
              axis={"xy"}
            />
          </Col>
          <Col md={6} className="image-grid-controllers prev">
            <Button
              variant="primary"
              onClick={() => _handlePrevStep()}
              disabled={selectionCount === 0}
            >
              Previous
            </Button>
          </Col>
          <Col md={6} className="image-grid-controllers">
            <Button variant="primary" onClick={() => _handleSave()}>
              Save
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ImageGrid;
