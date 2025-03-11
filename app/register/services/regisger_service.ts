import liff from "@line/liff";
import axios from "axios";

const baseURL = "https://api-line-bot.homeone.co.th";

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
        setIintLine(true);
        const user = await getEnvironmentLine();
        setUserId(user);
        setLoading(false);
    } catch (error) {
        throw error;
    } finally {
        setLoading(false);
    }
};


export const registerUserByTaxId = async (taxId: string, user_id: string) => {
    try {
        return await axios.post(`${baseURL}/api/line/registerRichMenuToUser?tax_id=${taxId}&user_id=${user_id}`,);

    } catch (error) {
        throw error;
    }
}


export const getEnvironmentLine = async (): Promise<string> => {
    try {
        if (liff.isLoggedIn()) {
            var user = await liff.getProfile();
            if (!user) throw 'e';
            return user.userId;
        } else {
            throw 'e';
        }

    } catch (error) {
        throw "is not login";
    }
}

