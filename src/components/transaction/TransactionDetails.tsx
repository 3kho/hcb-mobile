import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { ReactElement } from "react";
import { View, Text, TouchableHighlight } from "react-native";

import { StackParamList } from "../../lib/NavigatorParamList";
import Transaction from "../../lib/types/Transaction";
import { palette } from "../../theme";

interface Detail {
  label: string;
  value: ReactElement | string;
  onPress?: () => void;
  pressIconName?: React.ComponentProps<typeof Ionicons>["name"];
}

export function descriptionDetail(
  org: string,
  transaction: Transaction,
  navigation: NativeStackNavigationProp<StackParamList, "Transaction">,
): Detail {
  return {
    label: "Description",
    value: !transaction.has_custom_memo ? (
      <Text style={{ color: "#338eda", textAlign: "right", flex: 1 }}>
        Add Description
      </Text>
    ) : (
      transaction.memo
    ),
    onPress() {
      navigation.navigate("RenameTransaction", { orgId: org, transaction });
    },
  };
}

export default function TransactionDetails({ details }: { details: Detail[] }) {
  const { colors: themeColors } = useTheme();

  return details.map(
    (
      { label, value, onPress, pressIconName = "chevron-forward-outline" },
      index,
    ) => (
      <TouchableHighlight
        onPress={onPress}
        underlayColor={themeColors.background}
        activeOpacity={0.7}
        key={label}
      >
        <View
          style={{
            backgroundColor: themeColors.card,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
            borderTopLeftRadius: index == 0 ? 8 : 0,
            borderTopRightRadius: index == 0 ? 8 : 0,
            borderBottomLeftRadius: index == details.length - 1 ? 8 : 0,
            borderBottomRightRadius: index == details.length - 1 ? 8 : 0,
            maxHeight: 40,
          }}
        >
          <Text style={{ color: palette.muted, marginRight: 10 }}>{label}</Text>
          {typeof value == "string" ? (
            <Text
              numberOfLines={1}
              style={{
                color: themeColors.text,
                overflow: "hidden",
                flex: 1,
                textAlign: "right",
              }}
            >
              {value}
            </Text>
          ) : (
            value
          )}
          {onPress && (
            <Ionicons
              name={pressIconName}
              size={18}
              color={palette.muted}
              style={{ marginLeft: 8 }}
            />
          )}
        </View>
      </TouchableHighlight>
    ),
  );
}
