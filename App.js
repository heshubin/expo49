import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import ImageViewer from './src/component/ImageViewer';
import Button from './src/component/Button';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import IconButton from './src/component/IconButton';
import CircleButton from './src/component/CircleButton';
import EmojiPicker from './src/component/EmojiPicker';
import EmojiList from './src/component/EmojiList';
import EmojiSticker from './src/component/EmojiSticker';

const PlaceholderImage = require('./assets/images/background-image.png');


export default function App() {


  // 保存选择裁剪后的图片
  const [selectedImage, setSelectedImage] = useState(null);
  // 用来显示或隐藏打开模式的按钮以及其他一些选项
  const [showAppOptions, setShowAppOptions] = useState(false);
  // 控制显示表情符区域
  const [isModalVisible, setIsModalVisible] = useState(false);
  // 选择的表情
  const [pickedEmoji, setPickedEmoji] = useState(null);

  const pickImageAsync = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      // 选取了图片
      console.log(result);
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  };


  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    // we will implement this later
  };

  return (
    <View style={styles.container}>

      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} />
        {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
      </View>


      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      )
        : (
          <View style={styles.footerContainer}>
            <Button label="Choose a photo" theme="primary" onPress={pickImageAsync} />
            <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
          </View>
        )}

      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      {/* <Text style={{ color: '#fff' }}>Hello William. 1900 Open up App.js to start working on your app!</Text> */}
      <StatusBar style="auto" />
    </View>
  );




}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },

  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },

});
