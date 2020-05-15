import {Button, Card, Table, Modal} from 'react-bootstrap';
import React, {useState} from 'react';
import {arrayBufferToBase64, getFormattedTime} from '../utils';

const renderPicture = (picture, id) => {
  const [showPicture, setShowPicture] = useState(
    false
  );
  return [
    <Modal key={`modal_${id}`} show={showPicture} onHide={() => setShowPicture(false)} size="lg"
           aria-labelledby="contained-modal-title-vcenter"
           centered>
      {/*<Modal.Body>*/}
      <img src={`data:${picture.contentType};base64,${arrayBufferToBase64(picture.data.data)}`}/>
      {/*</Modal.Body>*/}
    </Modal>,
    <Button key={`button_${id}`} variant="primary" onClick={() => setShowPicture(true)}>
      View
    </Button>,
  ];
}

const ReviewWidget = (props) => {
  const {review, showUser, editDeleteAllowed, onEdit, onDelete} = props;
  return (
    <Card key={review._id}>
      <Card.Header>{showUser ? review.user.username : review.restaurant.name}</Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <Table striped bordered hover>
            <thead>
            <tr>
              <th>Bathroom Quality</th>
              <th>Staff Kindness</th>
              <th>Cleanliness</th>
              <th>Drive-thru quality</th>
              <th>Delivery Speed</th>
              <th>Food Quality</th>
              <th>Picture</th>
              {editDeleteAllowed ? <>
                <th>Edit</th>
                <th>Delete</th>
              </> : null}
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{review.bathroomQuality}</td>
              <td>{review.staffKindness}</td>
              <td>{review.cleanliness}</td>
              <td>{review.driveThruQuality}</td>
              <td>{review.deliverySpeed}</td>
              <td>{review.foodQuality}</td>
              <td>{review.picture ? renderPicture(review.picture, review._id) : null}</td>
              {editDeleteAllowed ? <>
                <td><Button variant="primary" onClick={() => onEdit(review)}>
                  Edit
                </Button></td>
                <td><Button variant="primary" onClick={() => onDelete(review)}>
                  Delete
                </Button></td>
              </> : null}
            </tr>
            </tbody>
          </Table>
          <footer className="blockquote-footer">
            {getFormattedTime(review.creationTime)}
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
};

export {ReviewWidget};
