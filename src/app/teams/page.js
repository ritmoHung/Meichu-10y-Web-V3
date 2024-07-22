import TeamList from "@/components/main/team/team-list";



export default function Teams() {
	return (
        <div className="grid grid-rows-[auto_1fr]">
            <header className="mb-4">
                <h1 className="bracket bracket-md justify-center">歷屆作品</h1>
			</header>
			<main>
				<TeamList />
            </main>
        </div>
    );
}