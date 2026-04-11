import useSound from "use-sound"
import { useTestMode } from "@/context/TestModeContext"

export const useSounds = () =>{ 
    const {sound, volume} = useTestMode();

    const options = {
        volume: sound ? volume : 0,
    };


    const [key1] = useSound('/sounds/yzaak-keyboard-sound-satisfying-304411_DUJvzC0n.mp3', options);
    const [key2] = useSound('/sounds/yzaak-keyboard-sound-satisfying-304411_hbQv7oqP.mp3', options);
    //const [key3] = useSound('/sounds/freesound_community-mechanical-key-soft-80731 (1).mp3');
    //const [key4] = useSound('/sounds/mixkit-single-key-type-2533.wav');
    //const [key5] = useSound('/sounds/yzaak-keyboard-sound-satisfying-304411_oCQ9mELt.mp3');
    const [spaceKey] = useSound('/sounds/yzaak-keyboard-sound-satisfying-304411_Ud1IGKck.mp3', options);
    const [key7] = useSound('/sounds/yzaak-keyboard-sound-satisfying-304411_XRuGXS2K.mp3', options);

    const keyVariants = [key1, key2/*, key3, key4, key5, key6*/, key7];

    const playKey = () => {
        const random = keyVariants[Math.floor(Math.random() * keyVariants.length)];
        random();
    };
    return {playKey, spaceKey};

};