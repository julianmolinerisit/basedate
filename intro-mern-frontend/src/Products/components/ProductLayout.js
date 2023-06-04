import React, { useState, useEffect } from 'react';
import { Modal, Container } from 'react-bulma-components';
import Header from './Header';
import AddButton from './AddButton';
import ListProducts from './ListProducts';
import Form from './Form';
import { saveProduct, getProducts } from '../services';
import Loading from './Loading';

const ProductLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  async function loadProducts() {
    try {
      const response = await getProducts();

      if (response && response.status === 200) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = async (data) => {
    await saveProduct(data);
    loadProducts();
    setIsModalOpen(false); // Cerrar el modal después de enviar el formulario
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <Header title="Products app" />
      <AddButton onClick={() => setIsModalOpen(true)} />
      {isLoading && <Loading />}
      {!isLoading && !products.length ? (
        <h2 className="title has-text-centered is-centered">You don't have products</h2>
      ) : (
        <ListProducts products={products} />
      )}
      <Modal show={isModalOpen} onClose={handleModalClose}>
        <Modal.Card>
          <Modal.Card.Title>Add Product</Modal.Card.Title>
          <Modal.Card.Body>
            <Form handleSubmit={handleSubmit} />
          </Modal.Card.Body>
        </Modal.Card>
      </Modal>
    </Container>
  );
};

export default ProductLayout;
