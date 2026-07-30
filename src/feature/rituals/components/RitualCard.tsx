import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Link } from "react-router-dom";
import type { Ritual } from "../type";

const RitualCard = (rituals: { rituals: Ritual }) => {
  return (
    <>
      <Card
        key={rituals.rituals.id}
        className="overflow-hidden border-border/60 bg-card/95 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
      >
        <CardHeader className="px-4 pt-4 pb-3">
          <CardTitle className="line-clamp-2 text-base font-semibold tracking-tight">
            {rituals.rituals.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="px-4 pb-0">
          <div className="h-px w-full bg-border/70" />
        </CardContent>
        {rituals.rituals.isHot ? <p>Hot</p> : <p>NotHot</p>}
        <CardFooter className="flex items-center justify-between gap-3 border-t-0 bg-muted/30 px-4 py-3">
          <div className="min-w-0 text-xs text-muted-foreground">
            <p className="truncate">{rituals.rituals.dateSolar}</p>
            {rituals.rituals.dateLunar ? (
              <p className="truncate">{rituals.rituals.dateLunar}</p>
            ) : null}
          </div>

          <Link
            to={`/rituals/${rituals.rituals.id}`}
            className="shrink-0 rounded-full border border-border/70 bg-background px-3 py-1 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
          >
            Xem chi tiết
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

export default RitualCard;
