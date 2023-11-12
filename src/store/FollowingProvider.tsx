import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, runTransaction, serverTimestamp, updateDoc } from 'firebase/firestore'
import { ReactNode, createContext, useContext, useEffect, useState, } from 'react';
import { number } from 'yup';
import { auth, firestore } from '../config/firebase-config'
export const FollowingContext = createContext<{
    ids: string[];
    follow: (userUID: string) => void;
    unFollow: (userUID: string) => void;
    isFollowing: (userUID: string) => boolean;
    getFollowersCount: (userUID: string) => Promise<number>;
    getFollowingCount: (userUID: string) => Promise<number>;

}>({
    ids: [],
    follow: (userUID: string) => { },
    unFollow: (userUID: string) => { },
    isFollowing: (userUID: string) => false,
    getFollowersCount: async (userUID: string) => { return 0 },
    getFollowingCount: async (userUID: string) => { return 0 }
});

type FollowingContextProviderProps = {
    children: ReactNode;
};

function FollowingContextProvider({ children }: FollowingContextProviderProps) {
    const [followingPersonsIds, setFollowingPersonsIds] = useState<string[]>([]);
    const [followersIds, setFollowersIds] = useState<string[]>([]);

    useEffect(() => {
        const user = auth.currentUser
        console.log("kaka")
        if (user) {
            const userRef = doc(firestore, 'users', user.uid);
            const unsubscribe = onSnapshot(userRef, (doc) => {
                if (doc.exists()) {
                    const data = doc.data();
                    if (data) {
                        if (data.following) {
                            setFollowingPersonsIds(data.following);
                        }
                        if (data.followers) {
                            setFollowersIds(data.followers);
                        }
                    }
                }
            });

            return () => unsubscribe();
        }
    }, []);
    async function follow(userUID: string) {
        const user = auth.currentUser
        if (user) {
            const userRefA = doc(firestore, 'users', user.uid);
            const userRefB =doc(firestore, 'users', userUID);

            await runTransaction(firestore, async (transaction) => {
                const docA = await transaction.get(userRefA);
                const docB = await transaction.get(userRefB);

                if (docA.exists() && docB.exists()) {
                    const dataA = docA.data();
                    const dataB = docB.data();

                    if (dataA && dataB) {
                        const updatedFollowingA = dataA.following ? [...dataA.following, userUID] : [userUID];
                        const updatedFollowersB = dataB.followers ? [...dataB.followers, user.uid] : [user.uid];


                        transaction.update(userRefA, { following: updatedFollowingA });
                        transaction.update(userRefB, { followers: updatedFollowersB });


                        setFollowingPersonsIds(updatedFollowingA);
                        setFollowersIds(updatedFollowersB);
                    }
                }
            });
        }
    }


   async function unFollow(userUID: string) {
        const user = auth.currentUser
        if (user) {
            const userRefA = doc(firestore, 'users', user.uid);
            const userRefB =doc(firestore, 'users', userUID);

            await runTransaction(firestore, async (transaction) => {
                const docA = await transaction.get(userRefA);
                const docB = await transaction.get(userRefB);

                if (docA.exists() && docB.exists()) {
                    const dataA = docA.data();
                    const dataB = docB.data();

                    if (dataA && dataB && dataA.following && dataB.followers) {
                        const updatedFollowingA = dataA.following.filter((uid: string) => uid !== userUID);
                        const updatedFollowersB = dataB.followers.filter((uid: string) => uid !== user.uid);

                        transaction.update(userRefA, { following: updatedFollowingA });
                        transaction.update(userRefB, { followers: updatedFollowersB });

                        setFollowingPersonsIds(updatedFollowingA);
                        setFollowersIds(updatedFollowersB);
                    }
                }
            });
        }
    }

    function isFollowing(userUID: string) {
        return followingPersonsIds.includes(userUID);
    }

    async function getFollowersCount(userUID: string) {
        const userRef = doc(firestore, 'users', userUID);
     
        const document = await getDoc(userRef);

        if (document.exists()) {
            const data = document.data();
            if (data && data.followers) {
                return data.followers.length;
            }
        }

        return 0;
    }

    async function getFollowingCount(userUID: string) {
        const userRef = doc(firestore, 'users', userUID);
        const document = await getDoc(userRef);


        if (document.exists()) {
            const data = document.data();
            if (data && data.following) {
                return data.following.length;
            }
        }

        return 0;
    }

    const value = {
        ids: followingPersonsIds,
        follow: follow,
        unFollow: unFollow,
        isFollowing: isFollowing,
        getFollowersCount: getFollowersCount,
        getFollowingCount: getFollowingCount
    };

    return (
        <FollowingContext.Provider value={value}>{children}</FollowingContext.Provider>
    );
}

export default FollowingContextProvider;



export function useFollowing() {
    const followingPersons = useContext(FollowingContext);

    if (followingPersons === undefined) {
        throw new Error('useFollowing must be used within an FollowingContext');
    }

    return followingPersons;
}