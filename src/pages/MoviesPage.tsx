import strings from "../utilities/strings";

export default function MoviesPage() {
    return (
        <main className="main-background">
            <div className="container py-10">
                <p className="text-4xl lg:text-6xl text-center font-extrabold dark:text-white">
                    { strings.moviesPage.title }
                </p>
            </div>
        </main>
    )
}