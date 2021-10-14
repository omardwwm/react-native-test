import React, { useState } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from "react-native";
import {ScrollView} from "react-native-gesture-handler";

const Conditions = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <ScrollView  onScroll={({nativeEvent}) => {
                            if (isCloseToBottom(nativeEvent)) {
                                // enableSomeButton();
                                setIsDisabled(false)
                            }
                        }}
                                     scrollEventThrottle={400}>

                            <Text style={styles.modalText}>Utilisation des données collectées
                                commentaires{"\n"}{"\n"}Lorsque vous laissez un commentaire sur notre site Web, les données saisies dans le formulaire de commentaire, ainsi que votre adresse IP et l'agent utilisateur de votre navigateur sont collectées pour nous aider à détecter les commentaires indésirables.{"\n"}{"\n"}Un canal anonyme créé à partir de votre adresse e-mail (également appelé hachage) peut être envoyé au service Gravatar pour vérifier si vous utilisez le service. Les clauses de confidentialité du service Gravatar sont disponibles ici: https://automattic.com/privacy/. Après validation de votre commentaire, votre photo de profil sera visible publiquement à côté de votre commentaire.{"\n"}{"\n"}
                                Moyens de communication{"\n"}{"\n"}Si vous êtes un utilisateur enregistré et que vous téléchargez des images sur le site Web, nous vous recommandons d'éviter de télécharger des images contenant des données de coordonnées GPS EXIF. Les visiteurs de votre site Web peuvent télécharger et extraire des données de localisation à partir de ces images.{"\n"}{"\n"}Formulaires de contact{"\n"}Cookies{"\n"}{"\n"}Si vous laissez un commentaire sur notre site, il vous sera proposé d'enregistrer votre nom, votre adresse e-mail et votre site Web dans des cookies. Ceci est uniquement pour votre commodité afin que vous n'ayez pas à saisir ces informations si vous postez un autre commentaire ultérieurement. Ces cookies expirent au bout d'un an.{"\n"}Si vous avez un compte et que vous vous connectez sur ce site, un cookie temporaire sera créé afin de déterminer si votre navigateur accepte les cookies. Il ne contient pas de données personnelles et sera supprimé automatiquement à la fermeture de votre navigateur.{"\n"}Lorsque vous vous connectez, nous définirons une série de cookies pour enregistrer vos informations de connexion et vos préférences d'écran. La durée de vie d'un cookie de connexion est de deux jours, celle d'un cookie d'option d'écran est d'un an. Si vous cochez "Se souvenir de moi", votre cookie de connexion sera conservé pendant deux semaines. Si vous vous déconnectez de votre compte, le cookie de connexion sera supprimé.{"\n"}Lors de la modification ou de la publication d'un article, un cookie supplémentaire sera enregistré dans votre navigateur. Ce cookie n'inclut aucune donnée personnelle. Il affiche uniquement l'ID du message que vous venez de modifier. Il expire au bout d'un jour.{"\n"}{"\n"}Contenu embarqué depuis d’autres sites{"\n"}Les articles de ce site peuvent inclure des contenus intégrés (par exemple des vidéos, images, articles…). Le contenu intégré depuis d’autres sites se comporte de la même manière que si le visiteur se rendait sur cet autre site.{"\n"}Ces sites Web peuvent collecter des données vous concernant, utiliser des cookies, incorporer des outils de suivi tiers, suivre vos interactions avec ce contenu intégré si vous avez un compte connecté sur leur site Web.{"\n"}{"\n"}Statistiques et mesures d’audience{"\n"}Utilisation et transmission de vos données personnelles{"\n"}Durées de stockage de vos données{"\n"}{"\n"}Si vous laissez un commentaire, le commentaire et ses métadonnées sont conservés indéfiniment. Cela permet de reconnaître et approuver automatiquement les commentaires suivants au lieu de les laisser dans la file de modération.{"\n"}Pour les utilisateurs et utilisatrices qui s’enregistrent sur notre site (si cela est possible), nous stockons également les données personnelles indiquées dans leur profil. Tous les utilisateurs et utilisatrices peuvent voir, modifier ou supprimer leurs informations personnelles à tout moment (à l’exception de leur nom d’utilisateur·ice). Les gestionnaires du site peuvent aussi voir et modifier ces informations.{"\n"}{"\n"}Les droits que vous avez sur vos données{"\n"}Si vous avez un compte ou si vous avez laissé des commentaires sur le site, vous pouvez demander à recevoir un fichier contenant toutes les données personnelles que nous possédons à votre sujet, incluant celles que vous nous avez fournies. Vous pouvez également demander la suppression des données personnelles vous concernant. Cela ne prend pas en compte les données stockées à des fins administratives, légales ou pour des raisons de sécurité.{"\n"}{"\n"}Transmission de vos données personnelles.{"\n"}Les commentaires des visiteurs peuvent être vérifiés à l’aide d’un service automatisé de détection des commentaires indésirables.
                            </Text>
                        </ScrollView>

                        <TouchableHighlight disabled={isDisabled}
                            style={!isDisabled? styles.openButton : styles.buttonDisabled}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                                alert("conditions acceptees")
                            }}
                        >
                            <Text style={styles.textStyle}>Accepter</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>

            <TouchableHighlight
                style={styles.openButton}
                onPress={() => {
                    setModalVisible(true);
                }}
            >
                <Text style={styles.textStyle}>Afficher la politique de confidentialité</Text>
            </TouchableHighlight>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#2e9f5e",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonDisabled:{
        backgroundColor: '#999',
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default Conditions;