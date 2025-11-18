-- =====================================================
-- CATEGORÍAS
-- =====================================================
INSERT INTO categories (name, description, image_url) VALUES('Tops', 'Tanto para looks de noche o para elevar outfits casuales.', '/assets/img/category-tops.png');
INSERT INTO categories (name, description, image_url) VALUES('Faldas', 'Largas, minis, con transparencia. Combinalas con tops y creá looks únicos.', '/assets/img/category-skirts.png');
INSERT INTO categories (name, description, image_url) VALUES('Vestidos', 'Largos, minis o midis. Tenemos el perfecto para vos.', '/assets/img/category-dresses.png');
INSERT INTO categories (name, description, image_url) VALUES('Calzado', 'Completá tu look con pasos llenos de estilo.', '/assets/img/category-shoes.png');
INSERT INTO categories (name, description, image_url) VALUES('Accesorios', 'El toque final que transforma tu look.', '/assets/img/category-accesories.png');

-- =====================================================
-- CARACTERÍSTICAS
-- =====================================================
INSERT INTO caracteristicas (name, icon_url) VALUES('Talle S', '/assets/img/prodHigh-size.png');
INSERT INTO caracteristicas (name, icon_url) VALUES('Talle M', '/assets/img/prodHigh-size.png');
INSERT INTO caracteristicas (name, icon_url) VALUES('Talle L', '/assets/img/prodHigh-size.png');
INSERT INTO caracteristicas (name, icon_url) VALUES('Tela de lino', '/assets/img/prodHigh-fabric.png');
INSERT INTO caracteristicas (name, icon_url) VALUES('Tela de seda', '/assets/img/prodHigh-fabric.png');
INSERT INTO caracteristicas (name, icon_url) VALUES('Largo de la prenda: Corto', '/assets/img/prodHigh-fit.png');
INSERT INTO caracteristicas (name, icon_url) VALUES('Largo de la prenda: Midi', '/assets/img/prodHigh-fit.png');
INSERT INTO caracteristicas (name, icon_url) VALUES('Largo de la prenda: Largo', '/assets/img/prodHigh-fit.png');
INSERT INTO caracteristicas (name, icon_url) VALUES('Tela con lurex', '/assets/img/prodHigh-print.png');
INSERT INTO caracteristicas (name, icon_url) VALUES('Tela con lentejuelas', '/assets/img/prodHigh-print.png');
INSERT INTO caracteristicas (name, icon_url) VALUES('Tela suave', '/assets/img/prodHigh-feel.png');

-- =====================================================
-- PRODUCTOS
-- =====================================================
INSERT INTO products (name, description, category_id, code, price, size) VALUES ('Top Pekin', 'Tejido de punto apto para agua.\n-Color crema\n-Tela dry fit\n-Tela con protección UV.', 1, 22123, 1000, 'M');
INSERT INTO products (name, description, category_id, code, price, size) VALUES ('Vestido Latina', 'Vestido corto en tejido de punto, con escote en espalda y corte en laterales frontales.\n-Color gris oscuro\n-Tejido de lúrex', 3, 22234, 800, 'S');
INSERT INTO products (name, description, category_id, code, price, size) VALUES ('Falda Ibiza', 'Falda de tejido de punto elastizado, tiro medio, con detalle de hebilla\n-Color negro\n-Queda por debajo de la cadera\n-Tejido de lúrex\n*El top no está incluido', 2, 22345, 1500, 'L');
INSERT INTO products (name, description, category_id, code, price, size) VALUES ('Falda Volados','Falda de tejido de punto elastizado, tiro medio, con volados\n-Color gold\n-Tejido de lúrex', null, 22456, 1200, 'M');
INSERT INTO products (name, description, category_id, code, price, size) VALUES ('Vestido Ola', 'Vestido tejido corto, con aberturas a lo largo de los brazos y en el escote, ideal y cómodo tanto para fiestas a la noche o civiles.\n-Color negro\n-Tejido de lúrex\n-Color negro', 3, 22557, 1800, 'L');
INSERT INTO products (name, description, category_id, code, price, size) VALUES ('Vestido Denver','Vestido corto confeccionado en lentejuelas, de manga larga y cuello redondo. Cuenta con lazo para ajustar en la cintura, con terminación de flecos.\n-Calce relajado\n-Color negro', 3, 22567, 1000, 'S');
INSERT INTO products (name, description, category_id, code, price, size) VALUES ('Vestido Saona', 'Vestido corto con breteles que se sujetan al cuello y espalda al descubierto que contiene apertura lateral a través de cierre invisible.\n-Detalle de frunces.\n-Color amarillo', 3, 22678, 1600, 'M');
INSERT INTO products (name, description, category_id, code, price, size) VALUES ('Vestido Moscú', 'Vestido de largo al tobillo y calce relajado, tiene elástico en el bajo busto que marca la silueta y mangas cortas y amplias, es súper cómodo y canchero.\n-Escote en V y cuadrado en espalda\n-Mangas amplias\n-Color fucsia', 3, 22789, 1400, 'L');
INSERT INTO products (name, description, category_id, code, price, size) VALUES ('Vestido Drop', 'Vestido sin mangas, realizado en viscosa con efecto crinkle, lo que da un aspecto símil drapeado. Con escote en el frente, espalda descubierta y recorte en la cintura con costuras elásticas en la parte trasera.\n-Largo mini\n-Color Verde', 3, 22890, 1200, 'S');
INSERT INTO products (name, description, category_id, code, price, size) VALUES ('Vestido Juliette', 'Vestido corto con breteles regulables y escote. Bordado de diseño calado en las tazas, frunces en la cintura y detalle de volados en la falda. Vestido ideal para civiles.\n-Volados en el ruedo y bordados cut-out en el frente\n-Color Crudo', 3, 22891, 400, 'S');
INSERT INTO products (name, description, category_id, code, price, size) VALUES ('Vestido Zebra', 'Vestido corto confeccionado en viscosa, con breteles cruzados en la espalda. Bordado de cebra hecho de lentejuelas y mostacillas. Con forrería a tono. Acceso por cierre invisible lateral.\n-Escote en espalda\n-Color negro y dorado', 3, 22892, 1400, 'M');
INSERT INTO products (name, description, category_id, code, price, size) VALUES ('Vestido Sol', 'Vestido largo (al tobillo), con breteles regulables que se cruzan en la espalda, confeccionado en gasa con bordado de mostacillas a tono que suman brillo.\n-Moldería relajada con recorte en la cintura\n-Largo al tobillo\n-Color amarillo', 3, 22893, 1400, 'S');
INSERT INTO products (name, description, category_id, code, price, size) VALUES ('Vestido Mar', 'Vestido corto mini, confeccionado en microfibra alta torsión. Presenta detalle de buche en delantero.\n-Color azul', 3, 22894, 1300, 'M');
INSERT INTO products (name, description, category_id, code, price, size) VALUES ('Sandalia Tiras', 'Sandalias 100% confeccionadas en cuero vacuno. Taco piramidal de 6cm. Con elástico en tiras de empeine del lado interior.\n-Punta cuadrada\n-Color gold', 4, 26123, 1100, 'Tallle 36');
INSERT INTO products (name, description, category_id, code, price, size) VALUES ('Sandalia Trenza', 'Sandalias 100% confeccionadas en cuero vacuno. Taco de 7.5cm y plataforma de 3cm. Con dos tiras de cuero trenzadas. Súper livianas y cómodas!\n-Punta cuadrada redondeada\n-Color peltre', 4, 26234, 1100, 'Talle 37');
INSERT INTO products (name, description, category_id, code, price, size) VALUES ('Sandalia Ana', 'Sandalias 100% confeccionadas en cuero vacuno. Tira principal acolchada para mayor comodidad. Taco piramidal de 6cm que brinda estabilidad y seguridad al caminar.\n-Punta cuadrada\n-Color negro', 4, 26335, 1100, 'Talle 38');
INSERT INTO products (name, description, category_id, code, price, size) VALUES ('Sandalia Ana Plata', 'Sandalias 100% confeccionadas en cuero vacuno. Tira principal acolchada para mayor comodidad. Taco piramidal de 6cm que brinda estabilidad y seguridad al caminar.\n-Punta cuadrada\n-Color plata', 4, 26345, 1100, 'Talle 38');
INSERT INTO products (name, description, category_id, code, price, size) VALUES ('Sandalia Adele', 'Sandalia de gamuza, realizada 100% en cuero. Con un taco ideal de 4cms de alto. Súper cómodas para no sacárselas en toda la noche.\n-Taco de 4 cm.\n-Color negro', 4, 26567, 1100, 'Talle 35');
INSERT INTO products (name, description, category_id, code, price, size) VALUES ('Bota Lea', 'Bota confeccionada 100% en cuero gamuzado combinado con recortes de croco y recorrido de remaches a tono. Con taco cuadrado de 7,5cm de altura. Perfectas para fiestas más relajadas\n-Bota caña baja\n-Cierre en talón\n-Color negro', 4, 26678, 1200, 'Talle 38');
INSERT INTO products (name, description, category_id, code, price, size) VALUES ('Sandalia Eme', 'Sandalia confeccionada 100% en cuero vacuno. Con una tira frontal. Con taco de 8cm y plataforma de 2cm. Combina absolutamente con todo y son ideales para bailiar toda la noche!\n-Color plata', 4, 26789, 1200, 'Talle 37');
INSERT INTO products (name, description, category_id, code, price, size) VALUES ('Sandalia Manuela', 'Toda de terciopelo hecha a mano, ideal para novias y para todas las fiestas! Taco de 7cm. Plantilla extra acolchonada para bailar toda la noche!\n-Color verde', 4, 26890, 1300, 'Talle 35');
INSERT INTO products (name, description, category_id, code, price, size) VALUES ('Sandalia Tana', 'Sandalias 100% confeccionadas en cuero vacuno. Altura ideal y comodidad máxima. Plantilla extra acolchonada para bailar toda la noche! Taco de 8cm y plataforma de 1,5cm\n-Color plata', 4, 26891, 400, 'Talle 39');
INSERT INTO products (name, description, category_id, code, price, size) VALUES ('Bota Juana', 'Bota corta confeccionada 100% cuero vacuno. Taco perfecto de 6cm, calce perfecto, usala con vestidos y pantalones, esta bota va a elevar todos tus looks!\n-Color peltre', 4, 26892, 1400, 'Talle 35');
INSERT INTO products (name, description, category_id, code, price, size) VALUES ('Collar Heart', 'Collar corto compuesto por una cadena de mostacillas y corazones en metal a tono. El cierre cuenta con cadenita para regular su extensión y un pequeño gancho metálico.\n-Ajuste regulable\n-Medidas 42 cm\n-Color verde metálico', 5, 28345, 300, 'Talle único');
INSERT INTO products (name, description, category_id, code, price, size) VALUES ('Collar Fergus', 'Collar de múltiples cadenas de mostacillas negras unidas por un gran dije central con forma de flor en metal labrado con incrustaciones.\n-Medidas: 55 cm.\n-Color negro y dorado', 5, 28456, 300, 'Talle único');
INSERT INTO products (name, description, category_id, code, price, size) VALUES ('Collar Flower ', 'Collar tipo choker, compuesto por cadenas con eslabones gruesos y chatos. El protagonista de esta pieza es su flor central en metal con diseño labrado y detalles en strass.\n-Medidas 35 cm.\n-Color plata',5, 28567, 400, 'Talle único');
INSERT INTO products (name, description, category_id, code, price, size) VALUES ('Collar Cadena', 'Collar corto, compuesto por una cadena gruesa con eslabones de diseño en metal. Un accesorio súper canchero para fiestas descontracturadas o más formales.\n-Medidas 40 cm.\n-Color dorado', 5, 28678, 200, 'Talle único');
INSERT INTO products (name, description, category_id, code, price, size) VALUES ('Pulsera Flower', 'Pulsera en metal, compuesto por cadenas con eslabones gruesos y chatos. Su detalle protagonista es la flor central en metal con textura y detalles en strass.\n-Medidas 13,5 cm.\n-Color plata', 5, 28789, 400, 'Talle único');
INSERT INTO products (name, description, category_id, code, price, size) VALUES ('Cartera Nudo', 'Sobre/cartera con nudo en el frente, un divertido toque final para tus looks festivos. Se puede sostener mediante el nudo frontal o con la cadena desmontable. Composición 100% cuero.\n-Medidas: 25cm x 12cm\n-Color negro', 5, 28890, 400, 'Talle único');
INSERT INTO products (name, description, category_id, code, price, size) VALUES ('Cartera Flower', 'Sobre pequeño tipo billetera. Confeccionado en cuero, con apliques de flores bordadas en el frente y detalle de tachas en color dorado viejo. El interior cuenta con un tarjetero en uno de sus lados.\n-Medidas 16 cm. x 10 cm.\n-Color azul y dorado', 5, 28891, 400, 'Talle único');
INSERT INTO products (name, description, category_id, code, price, size) VALUES ('Sobre Diamante', 'Sobre con correa extraíble, en cuero sintético con decoración de cristales y herrajes plateados y dorados. Cierre con broche imantado y bolsillo interior.\n-Longitud de la correa 15cm\n-Medidas: 30cm de ancho x 12cm de alto\n-Color plateado y dorado', 5, 28892, 400, 'Talle único');
INSERT INTO products (name, description, category_id, code, price, size) VALUES ('Cinto Flower', 'Cinturón realizado en piezas metálicas irregulares superpuestas con apliques en strass. Con tres medidas y un tramo elástico para adaptar el ajuste.\n-Medidas 80 cm.\n-Color plata', 5, 28234, 200, 'Talle único');
INSERT INTO products (name, description, category_id, code, price, size) VALUES ('Vestido Foil', 'Vestido escote en V, confeccionado en tejido elastizado con detalles de estampado foil que aportan brillo. Elástico en cintura y volados en la falda.\n-Largo hasta los tobillos\n-Mangas 3/4\n-Color plateado', 3, 22895, 1400, 'S');

-- =====================================================
-- Asignar características a productos
-- =====================================================
INSERT INTO product_caracteristicas (product_id, caracteristica_id) VALUES (1, 2);
INSERT INTO product_caracteristicas (product_id, caracteristica_id) VALUES (1, 9);
INSERT INTO product_caracteristicas (product_id, caracteristica_id) VALUES (2, 1);
INSERT INTO product_caracteristicas (product_id, caracteristica_id) VALUES (2, 6);
INSERT INTO product_caracteristicas (product_id, caracteristica_id) VALUES (2, 9);
INSERT INTO product_caracteristicas (product_id, caracteristica_id) VALUES (3, 3);
INSERT INTO product_caracteristicas (product_id, caracteristica_id) VALUES (3, 6);
INSERT INTO product_caracteristicas (product_id, caracteristica_id) VALUES (3, 9);
INSERT INTO product_caracteristicas (product_id, caracteristica_id) VALUES (4, 2);
INSERT INTO product_caracteristicas (product_id, caracteristica_id) VALUES (4, 6);
INSERT INTO product_caracteristicas (product_id, caracteristica_id) VALUES (4, 9);
INSERT INTO product_caracteristicas (product_id, caracteristica_id) VALUES (5, 3);
INSERT INTO product_caracteristicas (product_id, caracteristica_id) VALUES (5, 6);
INSERT INTO product_caracteristicas (product_id, caracteristica_id) VALUES (5, 9);
INSERT INTO product_caracteristicas (product_id, caracteristica_id) VALUES (6, 1);
INSERT INTO product_caracteristicas (product_id, caracteristica_id) VALUES (6, 6);
INSERT INTO product_caracteristicas (product_id, caracteristica_id) VALUES (6, 10);
INSERT INTO product_caracteristicas (product_id, caracteristica_id) VALUES (7, 2);
INSERT INTO product_caracteristicas (product_id, caracteristica_id) VALUES (7, 6);
INSERT INTO product_caracteristicas (product_id, caracteristica_id) VALUES (7, 5);
INSERT INTO product_caracteristicas (product_id, caracteristica_id) VALUES (8, 3);
INSERT INTO product_caracteristicas (product_id, caracteristica_id) VALUES (8, 5);
INSERT INTO product_caracteristicas (product_id, caracteristica_id) VALUES (8, 8);
INSERT INTO product_caracteristicas (product_id, caracteristica_id) VALUES (9, 1);
INSERT INTO product_caracteristicas (product_id, caracteristica_id) VALUES (9, 5);
INSERT INTO product_caracteristicas (product_id, caracteristica_id) VALUES (9, 7);
INSERT INTO product_caracteristicas (product_id, caracteristica_id) VALUES (10, 1);
INSERT INTO product_caracteristicas (product_id, caracteristica_id) VALUES (10, 5);
INSERT INTO product_caracteristicas (product_id, caracteristica_id) VALUES (10, 6);
INSERT INTO product_caracteristicas (product_id, caracteristica_id) VALUES (11, 2);
INSERT INTO product_caracteristicas (product_id, caracteristica_id) VALUES (11, 6);
INSERT INTO product_caracteristicas (product_id, caracteristica_id) VALUES (11, 10);
INSERT INTO product_caracteristicas (product_id, caracteristica_id) VALUES (12, 1);
INSERT INTO product_caracteristicas (product_id, caracteristica_id) VALUES (12, 8);
INSERT INTO product_caracteristicas (product_id, caracteristica_id) VALUES (12, 10);
INSERT INTO product_caracteristicas (product_id, caracteristica_id) VALUES (13, 2);
INSERT INTO product_caracteristicas (product_id, caracteristica_id) VALUES (13, 5);
INSERT INTO product_caracteristicas (product_id, caracteristica_id) VALUES (13, 6);


-- =====================================================
-- IMAGENES DE LOS PRODUCTOS
-- =====================================================
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/pekin1.png', 1);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/pekin2.png', 1);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/pekin3.png', 1);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/pekin4.png', 1);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/pekin5.png', 1);

INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/latina1.png', 2);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/latina2.png', 2);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/latina3.png', 2);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/latina4.png', 2);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/latina5.png', 2);

INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/ibiza1.png', 3);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/ibiza2.png', 3);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/ibiza3.png', 3);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/ibiza4.png', 3);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/ibiza5.png', 3);

INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/volados1.png', 4);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/volados2.png', 4);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/volados3.png', 4);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/volados4.png', 4);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/volados5.png', 4);

INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/ola1.png', 5);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/ola2.png', 5);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/ola3.png', 5);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/ola4.png', 5);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/ola5.png', 5);

INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/denver1.png', 6);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/denver2.png', 6);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/denver3.png', 6);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/denver4.png', 6);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/denver5.png', 6);

INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/saona1.png', 7);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/saona2.png', 7);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/saona3.png', 7);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/saona4.png', 7);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/saona5.png', 7);

INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/moscu1.png', 8);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/moscu2.png', 8);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/moscu3.png', 8);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/moscu4.png', 8);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/moscu5.png', 8);

INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/drop1.png', 9);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/drop2.png', 9);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/drop3.png', 9);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/drop4.png', 9);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/drop5.png', 9);

INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/juliette1.png', 10);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/juliette2.png', 10);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/juliette3.png', 10);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/juliette4.png', 10);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/juliette5.png', 10);

INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/zebra1.png', 11);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/zebra2.png', 11);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/zebra3.png', 11);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/zebra4.png', 11);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/zebra5.png', 11);

INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sol1.png', 12);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sol2.png', 12);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sol3.png', 12);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sol4.png', 12);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sol5.png', 12);

INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/mar1.png', 13);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/mar2.png', 13);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/mar3.png', 13);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/mar4.png', 13);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/mar5.png', 13);

INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-tiras1.png', 14);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-tiras2.png', 14);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-tiras3.png', 14);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-tiras4.png', 14);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-tiras5.png', 14);

INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-trenza1.png', 15);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-trenza2.png', 15);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-trenza3.png', 15);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-trenza4.png', 15);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-trenza5.png', 15);

INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-ana1.png', 16);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-ana2.png', 16);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-ana3.png', 16);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-ana4.png', 16);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-ana5.png', 16);

INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-ana-plata1.png', 17);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-ana-plata2.png', 17);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-ana-plata3.png', 17);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-ana-plata4.png', 17);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-ana-plata5.png', 17);

INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-adele1.png', 18);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-adele2.png', 18);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-adele3.png', 18);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-adele4.png', 18);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-adele5.png', 18);

INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/bota-lea1.png', 19);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/bota-lea2.png', 19);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/bota-lea3.png', 19);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/bota-lea4.png', 19);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/bota-lea5.png', 19);

INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-eme1.png', 20);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-eme2.png', 20);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-eme3.png', 20);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-eme4.png', 20);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-eme5.png', 20);

INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-manuela1.png', 21);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-manuela2.png', 21);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-manuela3.png', 21);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-manuela4.png', 21);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-manuela5.png', 21);

INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-tana1.png', 22);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-tana2.png', 22);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-tana3.png', 22);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-tana4.png', 22);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sandalia-tana5.png', 22);

INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/bota-juana1.png', 23);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/bota-juana2.png', 23);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/bota-juana3.png', 23);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/bota-juana4.png', 23);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/bota-juana5.png', 23);

INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/collar-heart1.png', 24);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/collar-heart2.png', 24);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/collar-heart3.png', 24);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/collar-heart4.png', 24);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/collar-heart5.png', 24);

INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/collar-fergus1.png', 25);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/collar-fergus2.png', 25);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/collar-fergus3.png', 25);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/collar-fergus4.png', 25);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/collar-fergus5.png', 25);

INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/collar-flower1.png', 26);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/collar-flower2.png', 26);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/collar-flower3.png', 26);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/collar-flower4.png', 26);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/collar-flower5.png', 26);

INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/collar-cadena1.png', 27);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/collar-cadena2.png', 27);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/collar-cadena3.png', 27);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/collar-cadena4.png', 27);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/collar-cadena5.png', 27);

INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/pulsera-flower1.png', 28);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/pulsera-flower2.png', 28);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/pulsera-flower3.png', 28);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/pulsera-flower4.png', 28);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/pulsera-flower5.png', 28);

INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/cartera-nudo1.png', 29);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/cartera-nudo2.png', 29);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/cartera-nudo3.png', 29);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/cartera-nudo4.png', 29);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/cartera-nudo5.png', 29);

INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/cartera-flower1.png', 30);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/cartera-flower2.png', 30);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/cartera-flower3.png', 30);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/cartera-flower4.png', 30);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/cartera-flower5.png', 30);

INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sobre-diamante1.png', 31);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sobre-diamante2.png', 31);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sobre-diamante3.png', 31);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sobre-diamante4.png', 31);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/sobre-diamante5.png', 31);

INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/cinto-flower1.png', 32);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/cinto-flower2.png', 32);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/cinto-flower3.png', 32);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/cinto-flower4.png', 32);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/cinto-flower5.png', 32);

INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/foil1.png', 33);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/foil2.png', 33);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/foil3.png', 33);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/foil4.png', 33);
INSERT INTO product_images (image_url, product_id) VALUES('/assets/img/foil5.png', 33);

-- =====================================================
-- Usuarios Admin
-- =====================================================
ALTER TABLE admin_users
ADD COLUMN is_admin BOOLEAN DEFAULT false;
ADD COLUMN editar_producto BOOLEAN DEFAULT false,
ADD COLUMN eliminar_producto BOOLEAN DEFAULT false;
ADD COLUMN agregar_producto BOOLEAN DEFAULT false;
ADD COLUMN editar_caracteristica BOOLEAN DEFAULT false;
ADD COLUMN eliminar_caracteristica BOOLEAN DEFAULT false;
ADD COLUMN agregar_categoria BOOLEAN DEFAULT false;

INSERT INTO admin_users (nombre, apellido, email, password,  is_admin, editar_producto, eliminar_producto, agregar_producto, editar_caracteristica, eliminar_caracteristica, agregar_categoria) VALUES('Lucia', 'Palermo', 'lucia@ejemplo.com', '123456', true, true, true, true, true, true, true);
INSERT INTO admin_users (nombre, apellido, email, password,  is_admin, editar_producto, eliminar_producto, agregar_producto, editar_caracteristica, eliminar_caracteristica, agregar_categoria) VALUES('Benjamin', 'Perez', 'benjamin@ejemplo.com', '678910', false, false, false, false, false, false, false);

-- =====================================================
-- Usuarios sitio publico
-- =====================================================
INSERT INTO users (nombre, apellido, email, password) VALUES('Olivia', 'Palermo', 'olivia@ejemplo.com', '123456o&');
INSERT INTO users (nombre, apellido, email, password) VALUES('Josefina', 'Perez', 'jose@ejemplo.com', '456789j&');
-- =====================================================
-- REVIEWS
-- =====================================================
-- Configuración de tabla reviews para que soporte emojis
ALTER TABLE reviews CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Asegurar que la columna comment soporte emojis
ALTER TABLE reviews MODIFY comment TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Valores de tabla reviews 
-- INSERT INTO reviews (rating, comment, created_at, user_id, product_id) VALUES (5, 'La sandalia es muy cómoda, el tamaño del taco es perfecto para estar con ellos muchas horas, el color muy lindo también', '2025-10-20', 1, 22);
INSERT INTO reviews (rating, comment, created_at, user_id, product_id) VALUES (5, 'Hermoso el vestido, el brillo que tiene la tela, y los detalles de tiritas en mangas y escote', '2025-11-11', 1, 5);
INSERT INTO reviews (rating, comment, created_at, user_id, product_id) VALUES (5, 'Hermosa la falda, sobre todo el detalle de los volados', '2025-10-16', 2, 4);

-- =====================================================
-- RESERVAS
-- =====================================================
INSERT INTO reservations (start_date, end_date, product_id, user_id, phone, note) VALUES ('2025-10-16', '2025-10-18', 22, 1, '099222444', 'Lo recojo por la tarde');
INSERT INTO reservations (start_date, end_date, product_id, user_id, phone, note) VALUES ('2025-11-7', '2025-11-9', 5, 1, '099222444', 'Lo recojo entre las 14 y las 18');
INSERT INTO reservations (start_date, end_date, product_id, user_id, phone, note) VALUES ('2025-11-07', '2025-11-09', 4, 2, '099666888', 'Lo recojo sobre las 14hs');
INSERT INTO reservations (start_date, end_date, product_id, user_id, phone, note) VALUES ('2025-11-28', '2025-11-30', 33, 2, '099666888', 'Lo recojo por la tarde');
INSERT INTO reservations (start_date, end_date, product_id, user_id, phone, note) VALUES ('2025-11-11', '2025-11-12', 5, 2, '099666888', 'Lo recojo por la tarde');
