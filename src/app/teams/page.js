import TeamList from "@/components/main/team/team-list";



export default function Teams() {
	return (
        <div className="wrapper-md mt-4 mb-16 md:mt-10 grid-rows-[auto_1fr]">
            <header className="mb-4">
                <h1 className="bracket bracket-md justify-center">歷屆作品</h1>
			</header>
			<main>
				<TeamList />
            </main>
        </div>
    );
}