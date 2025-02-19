import { useState } from "react";
import { Form, Col } from "react-bootstrap";

const BrandLogoUploader = ({
    setFieldValue,
    handleBlur,
    touched,
    errors,
    initialImage,
    useFor
}) => {
    const [previewImage, setPreviewImage] = useState( initialImage || null);

    const handleImageChange = (e) => {
        const file = e.currentTarget.files[0];
        if (file) {
            setFieldValue("brandLogo", file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        document.getElementById("brandLogoInput").click();
    };

    return (
        <Col sm={4}>
            <Form.Group controlId="brandLogo" className="d-flex flex-column justify-content-center text-center">
                {previewImage ? (
                    <div className="mt-2"
                        onClick={triggerFileInput}
                        style={{ cursor: "pointer" }}>
                        <img
                            src={previewImage}
                            alt="Brand Logo Preview"
                            className="img-fluid"
                            style={{
                                width: "120px",
                                height: "120px",
                                borderRadius: "100%",
                                objectFit: "cover",
                                border: "2px solid #ddd"
                            }}
                        />
                    </div>
                ) : (
                    <Form.Control
                        type="file"
                        id="brandLogoInput"
                        name="brandLogo"
                        accept="image/*"
                        onChange={handleImageChange}
                        onBlur={handleBlur}
                        isInvalid={touched.brandLogo && !!errors.brandLogo}
                        className="focus:border-0 shadow-none p-2"
                    />
                )}
                <Form.Control.Feedback type="invalid">{errors.brandLogo}</Form.Control.Feedback>
                <Form.Label>{useFor}</Form.Label>
            </Form.Group>
        </Col>
    );
};

export default BrandLogoUploader;
