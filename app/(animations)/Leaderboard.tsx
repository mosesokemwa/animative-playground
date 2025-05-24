import { AnimatedText, AnimatedView, View } from "@/components/Themed";
import { Image } from "react-native";
import {
  FadeInRight,
  interpolate,
  interpolateColor,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";

const users = [
  {
    name: "Stansall",
    score: 4,
  },
  {
    name: "Mordy",
    score: 20,
  },
  {
    name: "Gaylard",
    score: 33,
  },
  {
    name: "Glaysher",
    score: 35,
  },
  {
    name: "Glewe",
    score: 30,
  },
  {
    name: "St. Clair",
    score: 28,
  },
  {
    name: "Reubbens",
    score: 17,
  },
  {
    name: "Luety",
    score: 16,
  },
  {
    name: "Thorsen",
    score: 30,
  },
  {
    name: "Polycote",
    score: 31,
  },
];
type PlaceProps = {
  user: (typeof users)[number];
  index: number;
  anim: SharedValue<number>;
  onFinish?: () => void;
};

// constants
const _avatarSize = 28;
const _spacing = 4;
const _stagger = 70;

function Place({ user, index, onFinish, anim }: PlaceProps) {
  const _anim = useDerivedValue(() => {
    return withDelay(
      _stagger * index,
      withSpring(anim.value, {
        damping: 80,
        stiffness: 200,
      })
    );
  });

  const stylez = useAnimatedStyle(() => {
    return {
      height: interpolate(
        _anim.value,
        [0, 1],
        [
          _avatarSize + _spacing,
          Math.max(user.score * 3, _avatarSize + _spacing),
        ]
      ),
      backgroundColor:
        index === 2
          ? interpolateColor(
              _anim.value,
              [0, 1],
              ["rgba(0,0,0,0.1)", "turquoise"]
            )
          : "rgba(0,0,0,0.1)",
    };
  });

  const textStylez = useAnimatedStyle(() => {
    return {
      opacity: interpolate(_anim.value, [0, 0.5, 1], [0, 0, 1]),
    };
  });

  return (
    <AnimatedView
      entering={FadeInRight.delay(_stagger * index)
        .springify()
        .damping(80)
        .stiffness(200)
        .withCallback((finished) => {
          if (finished && onFinish) {
            runOnJS(onFinish)();
          }
        })}
    >
      <AnimatedText
        style={[
          {
            fontSize: 7,
            fontWeight: "700",
            color: "rgba(0,0,0,0.5)",
            textAlign: "center",
          },
          textStylez,
        ]}
      >
        {user.score}
      </AnimatedText>

      <AnimatedView
        style={[
          {
            height: _avatarSize,
            borderRadius: _avatarSize,
          },
          stylez,
        ]}
        lightColor="rgba(0,0,0,0.1)"
        darkColor="rgba(245, 240, 240, 0.43)"
      >
        <View
          style={{
            aspectRatio: 1,
            width: _avatarSize,
          }}
        >
          <Image
            source={{ uri: `https://i.pravatar.cc/150?u=user_${user.name}` }}
            style={{
              flex: 1,
              aspectRatio: 1,
              borderRadius: _avatarSize,
            }}
          />
        </View>
      </AnimatedView>
    </AnimatedView>
  );
}

export default function Leaderboard() {
  const _anim = useSharedValue(0);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: _spacing,
          justifyContent: "flex-end",
          alignItems: "flex-end",
          height: 150,
        }}
      >
        {users.map((user, index) => (
          <Place
            key={index}
            user={user}
            index={index}
            anim={_anim}
            onFinish={
              index === users.length - 1
                ? () => {
                    _anim.value = 1;
                    console.log(`has finished: ${index}`);
                  }
                : undefined
            }
          />
        ))}
      </View>
    </View>
  );
}
