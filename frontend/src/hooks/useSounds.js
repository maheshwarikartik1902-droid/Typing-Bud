import useSound from "use-sound"
import { useTestMode } from "@/context/TestModeContext"

export const useSounds = () =>{ 
    const {sound, volume, soundType} = useTestMode();

    const options = {
        volume: sound ? volume : 0,
    };


    const [key1] = useSound('/sounds/key1.mp3', options);
    const [key2] = useSound('/sounds/key3.mp3', options);
    const [key3] = useSound('/sounds/key4.mp3', options);


    const [typerwriter1] = useSound('/sounds/typewriter-1.mp3', options);
    const [typerwriter2] = useSound('/sounds/typewriter-2.mp3', options);
    const [typerwriter3] = useSound('/sounds/typewriter-3.mp3', options);
    
    const [spaceKeyboard] = useSound('/sounds/spacekey.mp3', options);
    const [spaceTypewriter] = useSound('/sounds/typewriter-space.mp3', options);

    const keyVariants = [key1, key2, key3];
    const typeWriterVariants = [typerwriter1, typerwriter2, typerwriter3];

    const playKeyboard = () =>{
        const random = keyVariants[Math.floor(Math.random() * keyVariants.length)];
        random();
    };

    const playTypeWriter = () => {
        const random = typeWriterVariants[Math.floor(Math.random() * typeWriterVariants.length)];
        random();
    };

    const playKey = ()=> soundType === 'key'? playKeyboard() : playTypeWriter();
    const spaceKey = () => soundType === 'key'? spaceKeyboard() : spaceTypewriter();
    return {playKey, spaceKey};
};