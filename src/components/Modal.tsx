import React, { useState, ReactNode } from "react";
import { View, Text, StyleSheet, Image, Modal, ModalProps } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

type Props = ModalProps & {
  children: ReactNode;
};

export function ModalRemove({ children, ...rest }: Props) {
  return (
    <Modal transparent animationType="slide" {...rest}>
      <View style={styles.overlay}>
        <View style={styles.container}>{children}</View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: 600,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
});
