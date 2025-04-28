import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const TenisForm = ({ tenisParaEditar, onSalvar, onCancelar }) => {
    const [modelo, setModelo] = useState('');
    const [tamanho, setTamanho] = useState('');
    const [preco, setPreco] = useState('');
    const [imagemUrl, setImagemUrl] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (tenisParaEditar) {
            setModelo(tenisParaEditar.modelo || '');
            setTamanho(tenisParaEditar.tamanho || '');
            setPreco(tenisParaEditar.preco || '');
            setImagemUrl(tenisParaEditar.imagemUrl || '');
        } else {
            setModelo('');
            setTamanho('');
            setPreco('');
            setImagemUrl('');
        }
        setErrors({}); // Limpa os erros ao editar ou adicionar novo
    }, [tenisParaEditar]);

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!modelo.trim()) {
            newErrors.modelo = 'O modelo é obrigatório.';
            isValid = false;
        }
        if (!tamanho) {
            newErrors.tamanho = 'O tamanho é obrigatório.';
            isValid = false;
        } else if (isNaN(tamanho) || parseInt(tamanho) <= 0) {
            newErrors.tamanho = 'O tamanho deve ser um número válido.';
            isValid = false;
        }
        if (!preco) {
            newErrors.preco = 'O preço é obrigatório.';
            isValid = false;
        } else if (isNaN(preco) || parseFloat(preco) <= 0) {
            newErrors.preco = 'O preço deve ser um número válido.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            const novoTenis = {
                modelo,
                tamanho: parseInt(tamanho),
                preco: parseFloat(preco),
                imagemUrl: imagemUrl,
            };
            onSalvar(novoTenis);
            if (!tenisParaEditar) {
                setModelo('');
                setTamanho('');
                setPreco('');
                setImagemUrl('');
            }
            setErrors({}); // Limpa os erros após o sucesso
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="modelo">Modelo</Form.Label>
                <Form.Control
                    type="text"
                    id="modelo"
                    placeholder="Digite o modelo do tênis"
                    value={modelo}
                    onChange={(e) => setModelo(e.target.value)}
                    isInvalid={!!errors.modelo}
                />
                <Form.Control.Feedback type="invalid">{errors.modelo}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="tamanho">Tamanho</Form.Label>
                <Form.Control
                    type="number"
                    id="tamanho"
                    placeholder="Digite o tamanho (ex: 38, 42)"
                    value={tamanho}
                    onChange={(e) => setTamanho(e.target.value)}
                    isInvalid={!!errors.tamanho}
                />
                <Form.Control.Feedback type="invalid">{errors.tamanho}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="preco">Preço</Form.Label>
                <Form.Control
                    type="number"
                    id="preco"
                    placeholder="Digite o preço (ex: 199.99)"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    isInvalid={!!errors.preco}
                />
                <Form.Control.Feedback type="invalid">{errors.preco}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label htmlFor="imagemUrl">URL da Imagem</Form.Label>
                <Form.Control
                    type="url"
                    id="imagemUrl"
                    placeholder="Digite a URL da imagem do tênis"
                    value={imagemUrl}
                    onChange={(e) => setImagemUrl(e.target.value)}
                />
            </Form.Group>

            <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit" className="me-2">
                    {tenisParaEditar ? 'Atualizar Tênis' : 'Salvar Tênis'}
                </Button>
                {onCancelar && (
                    <Button variant="secondary" onClick={onCancelar}>
                        Cancelar
                    </Button>
                )}
            </div>
        </Form>
    );
};

export default TenisForm;