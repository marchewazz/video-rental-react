import { motion } from "framer-motion";

export default function Page(props: { children: any}) {
    return (
        <motion.main className="main-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: .5 }}>
            { props.children }
        </motion.main>
    )
}