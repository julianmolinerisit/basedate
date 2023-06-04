import React from 'react';
import { Card, Columns, Content, Heading } from 'react-bulma-components';

const ListProducts = ({ products }) => {
  return (
    <Columns>
      {products.map(({ description, name, size, _id, unitaryPrice, imgUrl }) => (
        <Columns.Column size={4} key={_id}>
          <Card>
            <Card.Image size="16by9" src={imgUrl} />
            <Card.Content>
              <Content>
                <Heading>{name}</Heading>
                <Heading subtitle size={6}>${unitaryPrice}</Heading>
                <Heading subtitle size={6}>{size}</Heading>
                <Heading subtitle size={6}>{description}</Heading>

              </Content>
            </Card.Content>
          </Card>
        </Columns.Column>
      ))}
    </Columns>
  );
};

export default ListProducts;
