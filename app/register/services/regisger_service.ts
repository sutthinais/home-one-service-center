import liff from "@line/liff";
import axios from "axios";


export const initializeLiff = async ({ setIintLine, setLoading, liffId, setUserId }: {
    setIintLine: React.Dispatch<React.SetStateAction<boolean>>,
    setUserId: React.Dispatch<React.SetStateAction<string>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    liffId: string,
}) => {
    try {
        // await new Promise((resolve) => setTimeout(resolve, 3000));
        const liff = (await import('@line/liff')).default;
        await liff.init({ liffId });
        const user = await getEnvironmentLine();
        setUserId(user);
        setIintLine(true);
        setLoading(false);
    } catch (error) {
        throw error;
    } finally {
        setLoading(false);
    }
};


export const registerUserByTaxId = async (taxId: string, user_id: string) => {
    try {
        return await axios.post(`http://192.168.64.92:4004/api/line/registerRichMenuToUser?tax_id=${taxId}&user_id=${user_id}`,);

    } catch (error) {
        throw error;
    }
}


export const getEnvironmentLine = async (): Promise<string> => {
    try {
        var user = await liff.getProfile();
        if (!user) throw 'e';
        return user.userId;
    } catch (error) {
        throw "is not login";
    }
}

