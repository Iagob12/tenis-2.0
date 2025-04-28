import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, InputGroup, FormControl, Modal } from 'react-bootstrap';
import TenisForm from './components/TenisForm';
import { getTenis, addTenis, updateTenis, deleteTenis } from './utils/localStorageUtils';
import './App.css';
import logo from './assets/logo.png';

function App() {
    const [tenis, setTenis] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [exibirModalAdicionar, setExibirModalAdicionar] = useState(false);
    const [tenisParaEditar, setTenisParaEditar] = useState(null);

    useEffect(() => {
        carregarTenis();
    }, []);

    const carregarTenis = () => {
        const listaDeTenis = getTenis();
        setTenis(listaDeTenis);
    };

    const handleSalvarTenis = (novoTenis) => {
        if (tenisParaEditar) {
            updateTenis(tenisParaEditar.id, novoTenis);
            setTenisParaEditar(null);
        } else {
            addTenis(novoTenis);
        }
        carregarTenis();
        setExibirModalAdicionar(false);
    };

    const handleEditarTenis = (id) => {
        const tenisEncontrado = tenis.find((t) => t.id === id);
        setTenisParaEditar(tenisEncontrado);
        setExibirModalAdicionar(true);
    };

    const handleExcluirTenis = (id) => {
        deleteTenis(id);
        carregarTenis();
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredTenis = tenis.filter(t =>
        t.modelo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container className="mt-3">
            <Row className="mb-3 align-items-center top-bar">
                <Col md="3" className="logo-container">
                    <img src={logo} alt="Help Tênis Logo" className="logo" />
                </Col>
                <Col md="6" className="search-container">
                    <InputGroup>
                        <FormControl
                            placeholder="Buscar tênis..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <Button variant="outline-secondary" className="search-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </Button>
                    </InputGroup>
                </Col>
                <Col md="3" className="text-end">
                    <Button className="add-button" onClick={() => setExibirModalAdicionar(true)}>
                        Adicionar
                    </Button>
                </Col>
            </Row>

            <div className="tennis-list-container">
                {filteredTenis.map(tenis => (
                    <div key={tenis.id} className="tennis-card">
                        <div className="tennis-card-image-container">
                            {tenis.imagemUrl ? (
                                <img src={tenis.imagemUrl} alt={tenis.modelo} className="tennis-card-image" />
                            ) : (
                                <div className="tennis-card-image-placeholder"></div>
                            )}
                        </div>
                        <div className="tennis-card-body">
                            <p>Modelo: {tenis.modelo}</p>
                            <p>Preço: R$ {tenis.preco.toFixed(2)}</p>
                            <button className="btn-ver-mais" onClick={() => handleEditarTenis(tenis.id)}>Editar</button>
                            <button className="btn-excluir" onClick={() => handleExcluirTenis(tenis.id)}>Excluir</button>
                        </div>
                    </div>
                ))}
            </div>

            <Modal show={exibirModalAdicionar} onHide={() => setExibirModalAdicionar(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{tenisParaEditar ? 'Editar Tênis' : 'Adicionar Novo Tênis'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TenisForm
                        onSalvar={handleSalvarTenis}
                        onCancelar={() => setExibirModalAdicionar(false)}
                        tenisParaEditar={tenisParaEditar}
                    />
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default App;