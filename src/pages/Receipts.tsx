import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import { FlatList, View } from "react-native";
import useSWR from "swr";

import Transaction from "../components/Transaction";
import { ReceiptsStackParamList } from "../lib/NavigatorParamList";
import Organization from "../lib/types/Organization";
import ITransaction from "../lib/types/Transaction";
import { palette } from "../theme";

type Props = NativeStackScreenProps<
  ReceiptsStackParamList,
  "MissingReceiptList"
>;

export default function ReceiptsPage({ navigation: _navigation }: Props) {
  const { data } = useSWR<{
    data: (ITransaction & { organization: Organization })[];
  }>("/user/transactions/missing_receipt");

  return (
    <FlatList
      data={data?.data || []}
      renderItem={({ item }) => (
        <View style={{ marginBottom: 16, borderRadius: 8, overflow: "hidden" }}>
          <Transaction transaction={item} top hideAvatar />
          <Ionicons.Button
            name="cloud-upload-outline"
            onPress={() =>
              ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
              })
            }
            style={{ justifyContent: "center" }}
            backgroundColor={palette.darkless}
            borderRadius={0}
          >
            Upload receipt
          </Ionicons.Button>
        </View>
      )}
      // refreshing={isValidating}
      // onRefresh={() => mutate()}
      contentContainerStyle={{ padding: 20 }}
    />
  );
}
